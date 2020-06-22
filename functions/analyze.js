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

exports.handler = async function (event, _context) {
  const { hostname } = new URL(event.queryStringParameters.url)
  // Only analyze root path at the moment
  const url = 'https://' + hostname
  let codeError
  let showcase
  showcase = 'hello world'
  try {
    // filter hostname
    if (await isBlacklisted(hostname)) {
      throw new Error('Invalid URL')
    }

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
    // showcase = data && data.showcases[0] ? data.showcases[0] : null

    // if (showcase && !isOutdated(showcase)) {
    //   return {
    //     statusCode: 200,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(showcase)
    //   }
    // }

    if (showcase && isOutdated(showcase)) {
      // if true delete showcase
    }

    // consola.info(`Analyze ${url}...`)
    // const infos = await analyze(url)

    // if (process.env.CLOUDINARY_URL) {
    //   const { secure_url } = await cloudinary.uploader.upload(
    //     infos.screenshot,
    //     {
    //       folder: 'vue-telemetry',
    //       public_id: path.basename(
    //         infos.screenshot,
    //         path.extname(infos.screenshot)
    //       )
    //     }
    //   )
    //   infos.screenshot = secure_url
    // } else {
    //   // transform to base64
    //   const extname = path.extname(infos.screenshot)
    //   const base64 = await fs.readFile(infos.screenshot, { encoding: 'base64' })

    //   infos.screenshot = `data:image/${extname};base64,${base64}`
    // }

    // insert showcase

    // return
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(showcase)
    }
  } catch (err) {
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
