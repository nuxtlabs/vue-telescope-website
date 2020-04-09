module.exports = async function isBlacklisted(hname) {
  const hostnameBlacklist = /((local|dev(elopment)?|stag(e|ing)?|test(ing)?|demo(shop)?|admin|cache)\.|pr(eview)?-[0-9]{1,}|\/admin|\.local|localhost)/
  return hostnameBlacklist.test(hname)
}
