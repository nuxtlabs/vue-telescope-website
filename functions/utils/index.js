const slugify = require('speakingurl')

// eslint-disable-next-line require-await
exports.isBlacklisted = async function (hname) {
  const hostnameBlacklist = /((local|dev(elopment)?|stag(e|ing)?|test(ing)?|demo(shop)?|admin|cache)\.|pr(eview)?-[0-9]{1,}|\/admin|\.local|localhost)/
  return hostnameBlacklist.test(hname)
}

exports.isOutdated = function (showcase) {
  const weekAgo = 1000 * 60 * 60 * 24 * 7
  const today = new Date()
  const lastDetectedAt = new Date(showcase.last_detected_at)
  const diff = +today - +lastDetectedAt

  return diff >= weekAgo
}
