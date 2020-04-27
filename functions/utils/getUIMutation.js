const slugify = require('./slugify')

// eslint-disable-next-line require-await
module.exports = async function getUIMutation(ui) {
  if (!ui) return null

  return {
    data: {
      slug: slugify(ui),
      name: ui
    },
    on_conflict: {
      constraint: 'uis_slug_key',
      update_columns: 'slug'
    }
  }
}
