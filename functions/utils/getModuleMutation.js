const slugify = require('./slugify')

// eslint-disable-next-line require-await
module.exports = async function getModuleMutation(modules) {
  if (!modules) return []

  return modules.map((module) => {
    return {
      module: {
        data: {
          slug: slugify(module),
          name: module
        },
        on_conflict: {
          constraint: 'modules_slug_key',
          update_columns: 'slug'
        }
      }
    }
  })
}
