exports.slugify = function (domain) {
  return domain
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/(?:^-|-$)/, '')
}
