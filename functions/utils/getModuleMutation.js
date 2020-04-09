module.exports = async function getModuleMutation(modules) {
  if (!modules) return []

  return modules.map((module) => {
    return `{
        module: {
          data: {
            name: "${module}"
          }, 
          on_conflict: {
            constraint: modules_name_key,
            update_columns: name
          }
        }
      }`
  })
}
