module.exports = async function getPluginMutation(plugins) {
  if (!plugins) return []

  return plugins.map((plugin) => {
    return `{
        plugin: {
          data: {
            name: "${plugin}"
          },
          on_conflict: {
            constraint: plugins_name_key,
            update_columns: name
          }
        }
      }`
  })
}
