const slugify = require('./slugify')

// eslint-disable-next-line require-await
module.exports = async function getPluginMutation(plugins) {
  if (!plugins) return []

  return plugins.map((plugin) => {
    return {
      plugin: {
        data: {
          slug: slugify(plugin.name),
          name: plugin.name,
          url: plugin.url,
          img_path: plugin.imgPath
        },
        on_conflict: {
          constraint: 'plugins_slug_key',
          update_columns: 'slug'
        }
      }
    }
  })
}
