/* eslint-disable */
const fs = require('fs').promises
const path = require('path')
const analyze = require('vue-telemetry-analyzer')
const cloudinary = require('cloudinary').v2
const { URL } = require('url')
const axios = require('axios')
const consola = require('consola')

exports.handler = async function (event, context) {
  try {
    const { hostname } = new URL(event.queryStringParameters.url)
    // Only analyze root path at the moment
    const url = 'https://' + hostname

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

    console.log(`Analyze ${url}...`)
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
          vue_version: "${infos.vueVersion}"
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

async function hasuraDB(gqlPayload) {
  const { data } = await axios({
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET_KEY // TODO: secure it
    },
    url: process.env.API_HASURA_URL,
    method: 'post',
    data: {
      query: gqlPayload
    }
  })
  return data
}

function slugify(domain) {
  // TODO: slugify domain
  return domain.replace(/\./g, '-')
}

async function isBlacklisted(hname) {
  const hostnameBlacklist = /((local|dev(elopment)?|stag(e|ing)?|test(ing)?|demo(shop)?|admin|google|cache)\.|\/admin|\.local|localhost)/
  return hostnameBlacklist.test(hname)
}
