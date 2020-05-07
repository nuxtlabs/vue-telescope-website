/* eslint-disable */
const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const cloudinary = require('cloudinary').v2
const { URL } = require('url')
const consola = require('consola')
const getFrameworkMutation = require('./utils/getFrameworkMutation')
const getModuleMutation = require('./utils/getModuleMutation')
const getPluginMutation = require('./utils/getPluginMutation')
const getUIMutation = require('./utils/getUIMutation')
const hasura = require('./utils/hasura')
const isBlacklisted = require('./utils/isBlacklisted')
const slugify = require('./utils/slugify')
const gql = require('graphql-tag')
const { print } = require('graphql/language/printer')

exports.handler = async function (event, context) {
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
      query($url: String!) {
        scans(where: { url: { _eq: $url } }) {
          url
          is_proxy_blocked
        }
      }
    `
    // check if showcase has been scanned
    await hasura({
      query: print(QUERY_SCAN_BY_URL),
      variables: { url }
    }).then(({ data }) => {
      const scan = data.scans[0]
      if (scan) {
        codeError = 99
        throw new Error(`We are unable to scan ${hostname} at the moment...`)
      }
    })

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
          }
          framework {
            name
          }
          showcases_plugins {
            plugin {
              name
            }
          }
          showcase_modules {
            module {
              name
            }
          }
        }
      }
    `
    const { data } = await hasura({
      query: print(QUERY_SHOWCASE_BY_HOSTNAME),
      variables: { hostname }
    })
    showcase = data.showcases[0] ? data.showcases[0] : null

    if (showcase) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(showcase)
      }
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
      slug: slugify(infos.domain),
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
            }
            framework {
              name
            }
            showcases_plugins {
              plugin {
                name
              }
            }
            showcase_modules {
              module {
                name
              }
            }
          }
        }
      }
    `

    await hasura({
      query: print(INSERT_SHOWCASE),
      variables: { objects: showcaseObject }
    })
    .then(({ data }) => {
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
    consola.error('apiCode', err.apiCode)

    if (err.apiCode !== null) { // 0: not crawlable, 1: Vue not detected (see: https://github.com/nuxt-company/vue-telemetry-analyzer/blob/master/src/index.js)
      const scanObject = {
        url: url,
        is_proxy_blocked: err.statusCode === 403
      }
      const INSERT_SCANS = gql`
        mutation($objects: [scans_insert_input!]!) {
          insert_scans(
            objects: $objects,
            on_conflict: {
              constraint: scanned_url_key,
              update_columns: updated_at
            }) {
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
        apiErrorCode: err.apiCode || codeError,
        body: err.body || null
      })
    }
  }
}
