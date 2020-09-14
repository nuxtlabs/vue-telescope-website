const { Resolver } = require('dns').promises
const fetch = require('node-fetch')
const resolver = new Resolver()

const openDNSIPs = [/67\.215\.65.\d{3}/gi, /146\.112\.61\.\d{3}/gi]

function isOpenDNS(ip) {
  return openDNSIPs.some(function (regexp) {
    return regexp.test(ip)
  })
}

exports.isBlacklisted = function (hostname) {
  const blacklist = ['localhost']
  const likelyIP = Boolean(/\d/.test(hostname.split('.').pop()))
  return blacklist.includes(hostname) || likelyIP
}

exports.isOutdated = function (date, days) {
  const diff = Date.now() - +new Date(date)

  return diff >= 1000 * 60 * 60 * 24 * days
}

exports.fetchStrapi = async function (url, { method, body }) {
  if (typeof body === 'object') {
    body = JSON.stringify(body)
  }
  return await fetch(url, {
    method,
    ...(body ? { body } : {}),
    headers: {
      // authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText)
        // error.code = response.status
        error.statusCode = response.status
        error.body = response.body
        throw error
      }
      return response.json()
    })
    .catch((err) => {
      throw new Error(err)
    })
}

exports.normalizeUrl = require('./normalize-url')

// // sometimes hit false detection, since lookup return different IPs (usually when hosted on CDN)
// exports.isAdultContent = async function (domain) {
//   // regular check
//   resolver.setServers(['8.8.8.8'])
//   const regularIPs = await resolver.resolve(domain, 'A')
//   // adult check using
//   // https://www.opendns.com/setupguide/#familyshield
//   resolver.setServers(['208.67.222.123'])
//   const adultIPs = await resolver.resolve(domain, 'A')

//   // IP's order is not guaranteed, so need to check every item
//   const regularCheck = regularIPs.every((i) => adultIPs.includes(i))
//   const adultCheck = adultIPs.every((i) => regularIPs.includes(i))
//   if (regularCheck && adultCheck) {
//     return false
//   } else {
//     return true
//   }
// }

exports.isAdultContent = async function (domain) {
  resolver.setServers(['208.67.222.123'])
  const adultIPs = await resolver.resolve(domain, 'A')
  if (isOpenDNS(adultIPs[0])) {
    return true
  } else {
    return false
  }
}
