/* eslint-disable */
const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const ERROR_CODES = require('vue-telemetry-analyzer').ERROR_CODES
const cloudinary = require('cloudinary').v2
const { URL } = require('url')
const consola = require('consola')
const {
  getFrameworkMutation,
  getModuleMutation,
  getPluginMutation,
  getUIMutation,
  hasura,
  isBlacklisted,
  isOutdated
} = require('./utils')
const { slugify } = require('./utils/helpers')
const gql = require('graphql-tag')
const { print } = require('graphql/language/printer')

exports.handler = async function (event, _context) {
  const { hostname } = new URL(event.queryStringParameters.url)
  // Only analyze root path at the moment
  const url = 'https://' + hostname
  let codeError
  let showcase
  try {
    // filter hostname
    if (await isBlacklisted(hostname)) {
      throw new Error('Invalid URL')
    }

    const QUERY_SCAN_BY_URL = gql`
      query($url: String!, $date: timestamptz!) {
        scans(where: { url: { _eq: $url }, updated_at: { _gte: $date } }) {
          url
          updated_at
          is_proxy_blocked
        }
      }
    `
    // check if showcase has been scanned (only in production)
    if (!process.env.NETLIFY_DEV) {
      // date is now minus 24 hous
      const date = new Date(new Date().setDate(new Date().getDate() - 1))
      const scanRes = await hasura({
        query: print(QUERY_SCAN_BY_URL),
        variables: { url, date }
      })
      const scan = scanRes.data.scans[0]
      if (scan) {
        codeError = 99
        throw new Error(`We are unable to scan ${hostname} at the moment...`)
      }
    }

    // Check if showcase exists in Hasura
    const QUERY_SHOWCASE_BY_HOSTNAME = gql`
      query($hostname: String!) {
        showcases(where: { hostname: { _eq: $hostname } }) {
          id
          slug
          url
          domain
          hostname
          has_ssr
          is_static
          vue_version
          screenshot_url
          ui {
            name
            url
            img_path
          }
          framework {
            name
            url
            img_path
          }
          showcases_plugins {
            plugin {
              name
              url
              img_path
            }
          }
          showcase_modules {
            module {
              name
              url
              img_path
            }
          }
          last_detected_at
        }
      }
    `
    const { data } = await hasura({
      query: print(QUERY_SHOWCASE_BY_HOSTNAME),
      variables: { hostname }
    })
    showcase = data && data.showcases[0] ? data.showcases[0] : null

    if (showcase && !isOutdated(showcase)) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(showcase)
      }
    }

    if (showcase && isOutdated(showcase)) {
      const DELETE_SHOWCASE = gql`
        mutation($id: uuid!) {
          delete_showcases_plugins(where: { showcase_id: { _eq: $id } }) {
            affected_rows
          }
          delete_showcase_modules(where: { showcase_id: { _eq: $id } }) {
            affected_rows
          }
          delete_metas(where: { showcase: { id: { _eq: $id } } }) {
            affected_rows
          }
          delete_showcases(where: { id: { _eq: $id } }) {
            affected_rows
          }
        }
      `

      await hasura({
        query: print(DELETE_SHOWCASE),
        variables: { id: showcase.id }
      }).then(({ data }) => {
        if (!data) {
          throw new Error('Could not delete showcase')
        }
      })
    }

    consola.info(`Analyze ${url}...`)
    const infos = await analyze(url)

    if (process.env.CLOUDINARY_URL) {
      const { secure_url } = await cloudinary.uploader.upload(
        infos.screenshot,
        {
          folder: 'vue-telemetry',
          public_id: path.basename(
            infos.screenshot,
            path.extname(infos.screenshot)
          )
        }
      )
      infos.screenshot = secure_url
    } else {
      // transform to base64
      const extname = path.extname(infos.screenshot)
      const base64 = await fs.readFile(infos.screenshot, { encoding: 'base64' })

      infos.screenshot = `data:image/${extname};base64,${base64}`
    }

    // Build plugins mutation
    const plugins = await getPluginMutation(infos.plugins)
    // Build modules mutation
    const modules = await getModuleMutation(infos.frameworkModules)
    // Build framework mutation
    const framework = await getFrameworkMutation(infos.framework, modules)
    // Build ui mutation
    const ui = await getUIMutation(infos.ui)

    const showcaseObject = {
      url: infos.url,
      domain: infos.domain,
      hostname: infos.hostname,
      has_ssr: infos.hasSSR,
      is_static: infos.isStatic,
      screenshot_url: infos.screenshot,
      slug: slugify(infos.hostname),
      vue_version: infos.vueVersion,
      showcases_plugins: {
        data: plugins
      },
      showcase_modules: {
        data: modules
      },
      framework: framework,
      ui: ui,
      meta: {
        data: {
          language: infos.meta.language,
          title: infos.meta.title,
          description: infos.meta.description
        }
      }
    }

    const INSERT_SHOWCASE = gql`
      mutation($objects: [showcases_insert_input!]!) {
        insert_showcases(objects: $objects) {
          returning {
            id
            slug
            url
            domain
            hostname
            has_ssr
            is_static
            vue_version
            screenshot_url
            ui {
              name
              url
              img_path
            }
            framework {
              name
              url
              img_path
            }
            showcases_plugins {
              plugin {
                name
                url
                img_path
              }
            }
            showcase_modules {
              module {
                name
                url
                img_path
              }
            }
          }
        }
      }
    `

    await hasura({
      query: print(INSERT_SHOWCASE),
      variables: { objects: showcaseObject }
    }).then(({ data }) => {
      if (!data) {
        throw new Error('Could not insert in database, please try again')
      }
      showcase = data.insert_showcases.returning[0]
    })
    // Return
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showcase)
    }
  } catch (err) {
    consola.error(err)

    // Error from vue-telemetry-analyzer
    if (err.code) {
      // For ERROR_CODES, see: https://github.com/nuxt-company/vue-telemetry-analyzer/blob/master/src/index.js
      const scanObject = {
        url: url,
        is_proxy_blocked: err.statusCode === 403
      }
      const INSERT_SCANS = gql`
        mutation($objects: [scans_insert_input!]!) {
          insert_scans(
            objects: $objects
            on_conflict: {
              constraint: scanned_url_key
              update_columns: updated_at
            }
          ) {
            affected_rows
          }
        }
      `
      await hasura({
        query: print(INSERT_SCANS),
        variables: { objects: scanObject }
      })
    }

    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: err.message,
        statusCode: err.statusCode || 400,
        errorCode: err.code || codeError,
        body: err.body || null
      })
    }
  }
}
