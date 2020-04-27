const slugify = require('./slugify')

// eslint-disable-next-line require-await
module.exports = async function getFrameworkMutation(
  framework,
  moduleMutation
) {
  if (!framework) return null

  return {
    data: {
      slug: slugify(framework),
      name: framework,
      frameworks_modules: {
        data: moduleMutation
      }
    },
    on_conflict: {
      constraint: 'frameworks_slug_key',
      update_columns: 'slug'
    }
  }
}
