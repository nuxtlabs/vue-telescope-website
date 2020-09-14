/* eslint-disable */
const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const ERROR_CODES = require('vue-telemetry-analyzer').ERROR_CODES
const cloudinary = require('cloudinary').v2
const { URL } = require('url')
const consola = require('consola')
const {
  isBlacklisted,
  isOutdated,
  isAdultContent,
  fetchStrapi,
  normalizeUrl
} = require('../utils/functions')
const slugify = require('speakingurl')
// const normalizeUrl = require('normalize-url')
const fetch = require('node-fetch')

async function analyzeRequest(event, _context) {
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
  let force = event.queryStringParameters.force === 'true'
  const isPublic = event.queryStringParameters.isPublic === 'true'

  try {
    const rawUrl = event.queryStringParameters.url
    const normalizedUrl = normalizeUrl(rawUrl, {
      forceHttps: true,
      stripWWW: true
    })
    const parsedUrl = new URL(normalizedUrl)
    hostname = parsedUrl.hostname
    origin = parsedUrl.origin

    // filter hostname and IP's
    // old implementation wasn't reliable: errors local.com
    if (isBlacklisted(hostname)) {
      throw new Error('Invalid URL')
    }
    // get showcase by hostname
    let [existingShowcase] = await fetchStrapi(
      `${process.env.STRAPI_URL}/showcases?hostname=${hostname}&token=${process.env.STRAPI_TOKEN}`,
      {
        method: 'get'
      }
    )

    if (
      existingShowcase &&
      !isOutdated(existingShowcase.lastDetectedAt, 30) &&
      !force
    ) {
      if (isPublic && !existingShowcase.isPublic) {
        existingShowcase = await fetchStrapi(
          `${process.env.STRAPI_URL}/showcases?token=${process.env.STRAPI_TOKEN}`,
          {
            method: 'post',
            body: {
              slug: existingShowcase.slug,
              isPublic: true
            }
          }
        )
      }
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Existing showcase found',
          statusCode: 200,
          body: existingShowcase
        })
      }
    }

    // check if showcase has been scanned (only in production)
    if (!process.env.NETLIFY_DEV) {
      const existingScan = await fetchStrapi(
        `${process.env.STRAPI_URL}/scans?url=${hostname}&token=${process.env.STRAPI_TOKEN}`,
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

    consola.info(`Analyzing ${origin}...`)
    const infos = await analyze(origin)

    if (!infos.vueVersion) {
      // temporary return error message when Vue 3 or unknown Vue version
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Sorry, we cant analyze Vue 3 right now ;(',
          statusCode: 400,
          body: null
        })
      }
    }

    if (process.env.CLOUDINARY_URL) {
      const {
        secure_url,
        format,
        original_filename,
        public_id
      } = await cloudinary.uploader.upload(infos.screenshot, {
        folder: 'vue-telemetry',
        public_id: path.basename(
          infos.screenshot,
          path.extname(infos.screenshot)
        )
      })
      infos.screenshot = `${public_id}.${format}`
    }

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
      siteName: infos.meta.siteName,
      plugins: infos.plugins,
      modules: infos.frameworkModules,
      framework: infos.framework,
      ui: infos.ui,
      isPublic,
      isAdultContent:
        infos.meta.isAdultContent ||
        infos.meta.isRtaLabel ||
        (await isAdultContent(infos.hostname))
    }

    const saveShowcase = await fetchStrapi(
      `${process.env.STRAPI_URL}/showcases?token=${process.env.STRAPI_TOKEN}`,
      {
        method: 'post',
        body: showcaseData
      }
    )

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Showcase analyzed',
        statusCode: 200,
        body: saveShowcase
      })
    }
  } catch (err) {
    // error from vue-telemetry-analyzer
    if (err.code && err.message !== 'spawn ENOMEM') {
      // for ERROR_CODES, see: https://github.com/nuxt-company/vue-telemetry-analyzer/blob/master/src/index.js
      const scanData = {
        url: hostname,
        isProxyBlocked: err.statusCode === 403,
        error: err.message
      }

      const insertScan = await fetchStrapi(
        `${process.env.STRAPI_URL}/scans?token=${process.env.STRAPI_TOKEN}`,
        {
          method: 'post',
          body: scanData
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

const promiseTimeout = function (promise, ms) {
  // Create a promise that rejects in <ms> milliseconds
  let timeout = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id)
      reject('Timed out in ' + ms + 'ms.')
    }, ms)
  })
  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeout])
}

exports.handler = async function (event, _context) {
  let result
  try {
    result = await promiseTimeout(analyzeRequest(event, _context), 25000)
  } catch (err) {
    result = {
      statusCode: 408,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'A timeout occured, please try again later.',
        statusCode: 408
      })
    }
  }
  return result
}
