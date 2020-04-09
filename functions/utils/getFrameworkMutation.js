module.exports = async function getFrameworkMutation(
  framework,
  moduleMutation
) {
  if (!framework) return null

  return `{
      data: {
        name: "${framework}",
        frameworks_modules: {
          data: [${moduleMutation}]
        }
      },
      on_conflict: {
        constraint: frameworks_name_key,
        update_columns: name
      }
    }`
}
