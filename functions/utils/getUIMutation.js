const slugify = require('./slugify')

// eslint-disable-next-line require-await
module.exports = async function getUIMutation(ui) {
  if (!ui) return null

  return {
    data: {
      slug: slugify(ui.name),
      name: ui.name,
      url: ui.url,
      img_path: ui.imgPath
    },
    on_conflict: {
      constraint: 'uis_slug_key',
      update_columns: 'slug'
    }
  }
}
