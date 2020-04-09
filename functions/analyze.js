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
const hasuraDB = require('./utils/hasuraDB')
const isBlacklisted = require('./utils/isBlacklisted')
const slugify = require('./utils/slugify')

exports.handler = async function (event, context) {
  const { hostname } = new URL(event.queryStringParameters.url)
  // Only analyze root path at the moment
  const url = 'https://' + hostname

  try {
    // filter hostname
    if (await isBlacklisted(hostname)) {
      throw new Error('Invalid URL')
    }
    // TODO: Check if showcase exists in Hasura
    const QUERY_SHOWCASE_BY_HOSTNAME = `query {
      showcases(where: {hostname: {_eq: "${hostname}"}}) {
        id
      }
    }`
    const { data } = await hasuraDB(QUERY_SHOWCASE_BY_HOSTNAME)
    const showcase = data.showcases[0] ? data.showcases[0] : null
    // Return
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
    const pluginMutation = await getPluginMutation(infos.plugins)

    // Build modules mutation
    const moduleMutation = await getModuleMutation(infos.frameworkModules)
    // Build framework mutation
    const frameworkMutation = await getFrameworkMutation(
      infos.framework,
      moduleMutation
    )
    // Build ui mutation
    const uiMutation = await getUIMutation(infos.ui)
    // TODO: Mutation on Hasura
    const INSERT_SHOWCASE = `mutation {
      insert_showcases(
        objects: {
          url: "${infos.url}",
          domain: "${infos.domain}",
          hostname: "${infos.hostname}",
          has_ssr: "${infos.hasSSR}",
          is_static: "${infos.isStatic}",
          screenshot_url: "${infos.screenshot}",
          slug: "${slugify(infos.domain)}",
          vue_version: "${infos.vueVersion}",
          showcases_plugins: {
            data: [${pluginMutation}]
          },
          showcase_modules: {
            data: [${moduleMutation}]
          },
          framework: ${frameworkMutation},
          ui: ${uiMutation},
          meta: {
            data: {
              language: "${infos.meta.language}",
              title: "${infos.meta.title}",
              description: "${infos.meta.description}"
            }
          }
        }) {
        returning {
          id
        }
      }
    }`

    const res = await hasuraDB(INSERT_SHOWCASE)

    // Return
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(res)
    }
  } catch (err) {
    consola.error(err)

    const INSERT_SCANS = `mutation {
      insert_scans(
        objects: {
          url: "${url}",
          is_proxy_blocked: "${err.statusCode === 403}"
        }) {
        returning {
          id
        }
      }
    }`
    await hasuraDB(INSERT_SCANS)

    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: err.message,
        statusCode: err.statusCode || 400,
        body: err.body || null
      })
    }
  }
}
