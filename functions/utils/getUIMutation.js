module.exports = async function getUIMutation(ui) {
  if (!ui) return null

  return `{
      data: {
        name: "${ui}"
      },
      on_conflict: {
        constraint: uis_name_key,
        update_columns: name
      }
    }`
}
