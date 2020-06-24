/* eslint-disable */
const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const ERROR_CODES = require('vue-telemetry-analyzer').ERROR_CODES
const cloudinary = require('cloudinary').v2
const { URL } = require('url')
const consola = require('consola')
const { isBlacklisted, isOutdated, fetchStrapi } = require('./utils')
const slugify = require('speakingurl')
const normalizeUrl = require('normalize-url')
const fetch = require('node-fetch')

exports.handler = async function (event, _context) {
  let codeError
  if (!event.queryStringParameters.url) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Please provide URL',
        statusCode: 500,
        body: null
      })
    }
  }

  let origin
  let hostname

  try {
    const rawUrl = event.queryStringParameters.url
    const normalizedUrl = normalizeUrl(rawUrl, {
      forceHttps: true,
      stripWWW: true
    })
    const parsedUrl = new URL(normalizedUrl)
    hostname = parsedUrl.hostname
    origin = parsedUrl.origin

    // filter hostname
    // was not good implementation, errors local.com
    if (isBlacklisted(hostname)) {
      throw new Error('Invalid URL')
    }

    // check if showcase has been scanned (only in production)
    if (!process.env.NETLIFY_DEV) {
      const existingScan = await fetchStrapi(
        `https://vue-telemetry-api.herokuapp.com/scans?url=${hostname}`,
        {
          method: 'get'
        }
      )

      if (
        existingScan &&
        existingScan.length &&
        !isOutdated(existingScan[0].scannedAt, 1)
      ) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Vue is not detected on ${origin} (saved scan)`,
            statusCode: 400,
            body: null
          })
        }
      }
    }

    // get showcase by hostname
    const existingShowcase = await fetchStrapi(
      `https://vue-telemetry-api.herokuapp.com/showcases?hostname=${hostname}`,
      {
        method: 'get'
      }
    )

    if (
      existingShowcase &&
      existingShowcase.length &&
      !isOutdated(existingShowcase[0].lastDetectedAt, 7)
    ) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingShowcase[0])
      }
    }

    if (
      existingShowcase &&
      existingShowcase.length &&
      isOutdated(existingShowcase[0].lastDetectedAt, 7)
    ) {
      const deleteShowcase = await fetchStrapi(
        `https://vue-telemetry-api.herokuapp.com/showcases/${existingShowcase[0].id}`,
        {
          method: 'delete'
        }
      )
    }

    consola.info(`Analyzing ${origin}...`)
    const infos = await analyze(origin)

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
    }

    console.log(infos)

    // insert showcase
    const showcaseData = {
      url: infos.url,
      domain: infos.domain,
      hostname: infos.hostname,
      hasSSR: infos.hasSSR,
      isStatic: infos.isStatic,
      screenshotUrl: infos.screenshot,
      slug: slugify(infos.hostname),
      vueVersion: infos.vueVersion,
      language: infos.meta.language,
      title: infos.meta.title,
      description: infos.meta.description,
      plugins: infos.plugins,
      modules: infos.frameworkModules,
      framework: infos.framework,
      ui: infos.ui
    }

    const saveShowcase = await fetchStrapi(
      'https://vue-telemetry-api.herokuapp.com/showcases',
      {
        method: 'post',
        body: JSON.stringify(showcaseData)
      }
    )

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(saveShowcase)
    }
  } catch (err) {
    // error from vue-telemetry-analyzer
    if (err.code) {
      // for ERROR_CODES, see: https://github.com/nuxt-company/vue-telemetry-analyzer/blob/master/src/index.js
      const scanData = {
        url: hostname,
        isProxyBlocked: err.statusCode === 403
      }

      const insertScan = await fetchStrapi(
        'https://vue-telemetry-api.herokuapp.com/scans',
        {
          method: 'post',
          body: JSON.stringify(scanData)
        }
      )
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
