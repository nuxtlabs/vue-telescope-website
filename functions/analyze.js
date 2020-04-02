const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const cloudinary = require('cloudinary').v2
const { URL } = require('url')

exports.handler = async function (event, context) {
  try {
    const { hostname } = new URL(event.queryStringParameters.url)
    // Only analyze root path at the moment
    const url = 'https://' + hostname

    // TODO: Check if showcase exists in Redis
    // TODO: Check if showcase exists in Hasura
    // Save in Redis
    // Return

    console.log(`Analyze ${url}...`)
    const infos = await analyze(url)

    if (process.env.CLOUDINARY_URL) {
      const { secure_url } = await cloudinary.uploader.upload(infos.screenshot, {
        folder: 'vue-telemetry',
        public_id: path.basename(infos.screenshot, path.extname(infos.screenshot))
      })
      infos.screenshot = secure_url
    } else {
      // transform to base64
      const extname = path.extname(infos.screenshot)
      const base64 = await fs.readFile(infos.screenshot, { encoding: 'base64' })

      infos.screenshot = `data:image/${extname};base64,${base64}`
    }

    // TODO: Mutation on Hasura
    // TODO: Save in Redis
    // Return

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(infos)
    }
  } catch (err) {
    console.error(err)
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
