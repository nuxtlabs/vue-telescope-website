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
