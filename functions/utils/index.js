// eslint-disable-next-line require-await
exports.isBlacklisted = function (hostname) {
  // const hostnameBlacklist = /((local|dev(elopment)?|stag(e|ing)?|test(ing)?|demo(shop)?|admin|cache)\.|pr(eview)?-[0-9]{1,}|\/admin|\.local|localhost)/
  // return hostnameBlacklist.test(hname)
  const blacklist = ['localhost']
  return blacklist.includes(hostname)
}

exports.isOutdated = function (showcase) {
  const weekAgo = 1000 * 60 * 60 * 24 * 7

  const today = new Date()
  const diff = +today - +new Date(showcase.lastDetectedAt)

  return diff >= weekAgo
}
