/* eslint-disable */
const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const ERROR_CODES = require('vue-telemetry-analyzer').ERROR_CODES
const cloudinary = require('cloudinary').v2
const { URL } = require('url')
const consola = require('consola')
const { isBlacklisted, isOutdated } = require('./utils')
const slugify = require('speakingurl')
// const Url = require('url-parse')
const normalizeUrl = require('normalize-url')
const fetch = require('node-fetch')

exports.handler = async function (event, _context) {
  let codeError
  try {
    if (!event.queryStringParameters.url) {
      throw new Error('Please provide URL')
    }
    const rawUrl = event.queryStringParameters.url
    const normalizedUrl = normalizeUrl(rawUrl, {
      forceHttps: true,
      stripWWW: false
    })
    const { hostname, origin } = new URL(normalizedUrl)
    // const parsedUrl = new Url(rawUrl)
    // console.log(new URL(normalizedUrl))

    // filter hostname
    // was not good implementation, errors local.com
    if (isBlacklisted(hostname)) {
      throw new Error('Invalid URL')
    }

    // TODO: https://vue-telemetry-api.herokuapp.com/scans?url=google.com
    // use scanned_at

    // // check if showcase has been scanned (only in production)
    // if (!process.env.NETLIFY_DEV) {
    //   // date is now minus 24 hous
    //   const date = new Date(new Date().setDate(new Date().getDate() - 1))
    //   const scanRes = await hasura({
    //     query: print(QUERY_SCAN_BY_URL),
    //     variables: { url, date }
    //   })
    //   const scan = scanRes.data.scans[0]
    //   if (scan) {
    //     codeError = 99
    //     throw new Error(`We are unable to scan ${hostname} at the moment...`)
    //   }
    // }

    // get showcase by hostname
    const existingShowcase = await fetch(
      `https://vue-telemetry-api.herokuapp.com/showcases?hostname=${hostname}`,
      {
        method: 'get',
        headers: {
          authorization: `Bearer ${process.env.STRAPI_TOKEN}`
        }
      }
    )
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        throw new Error(err)
      })
    // console.log('existingShowcase', existingShowcase)

    // showcase = data && data.showcases[0] ? data.showcases[0] : null

    if (
      existingShowcase &&
      existingShowcase.length &&
      !isOutdated(existingShowcase[0])
    ) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(existingShowcase[0])
      }
    }

    // if (
    //   existingShowcase &&
    //   existingShowcase.length &&
    //   isOutdated(existingShowcase[0])
    // ) {
    //   console.log('OUTDATED')
    //   const deleteShowcase = await fetch(
    //     `https://vue-telemetry-api.herokuapp.com/showcases/${existingShowcase[0].id}`,
    //     {
    //       method: 'delete',
    //       headers: {
    //         authorization: `Bearer ${process.env.STRAPI_TOKEN}`
    //       }
    //     }
    //   )
    //     .then((response) => {
    //       return response.json()
    //     })
    //     .catch((err) => {
    //       throw new Error(err)
    //     })
    //   throw new Error('Deleted outdated showcase')
    // }

    consola.info(`Analyzing ${origin}...`)
    const infos = await analyze(origin)
    // console.log('infos', infos)

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

    // insert showcase

    const showcaseData = {
      url: infos.url,
      domain: infos.domain,
      hostname: infos.hostname,
      hasSSR: infos.hasSSR,
      isStatic: infos.isStatic,
      screenshotUrl: infos.screenshot,
      slug: slugify(infos.hostname),
      vueVersion: infos.vueVersion
      // plugins: infos.plugins
      // modules: infos.frameworkModules,
      // framework: infos.framework,
      // ui: infos.ui,
      // meta: {
      //   data: {
      //     language: infos.meta.language,
      //     title: infos.meta.title,
      //     description: infos.meta.description
      //   }
      // }
    }

    // console.log('showcaseData', showcaseData)

    const response = await fetch(
      'https://vue-telemetry-api.herokuapp.com/showcases',
      {
        method: 'post',
        body: JSON.stringify(showcaseData),
        headers: {
          authorization: `Bearer ${process.env.STRAPI_TOKEN}`
        }
      }
    )
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        throw new Error(err)
      })
    // console.log('response', response)

    // return
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log(err)

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
