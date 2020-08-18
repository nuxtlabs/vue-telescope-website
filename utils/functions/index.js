const { Resolver } = require('dns').promises
const fetch = require('node-fetch')
const resolver = new Resolver()

// eslint-disable-next-line require-await
exports.isBlacklisted = function (hostname) {
  // const hostnameBlacklist = /((local|dev(elopment)?|stag(e|ing)?|test(ing)?|demo(shop)?|admin|cache)\.|pr(eview)?-[0-9]{1,}|\/admin|\.local|localhost)/
  // return hostnameBlacklist.test(hname)
  const blacklist = ['localhost']
  return blacklist.includes(hostname)
}

exports.isOutdated = function (date, days) {
  const today = new Date()
  const diff = +today - +new Date(date)

  return diff >= 1000 * 60 * 60 * 24 * days
}

exports.fetchStrapi = async function (url, { method, body }) {
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

exports.isAdultContent = async function (domain) {
  // regular check
  resolver.setServers(['8.8.8.8'])
  const regularIPs = await resolver.resolve(domain, 'A')
  // adult check using
  // https://www.opendns.com/setupguide/#familyshield
  resolver.setServers(['208.67.222.123'])
  const adultIPs = await resolver.resolve(domain, 'A')

  // IP's order is not guaranteed, so need to check every item
  const regularCheck = regularIPs.every((i) => adultIPs.includes(i))
  const adultCheck = adultIPs.every((i) => regularIPs.includes(i))
  if (regularCheck && adultCheck) {
    return false
  } else {
    return true
  }
}
