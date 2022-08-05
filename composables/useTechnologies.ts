export const useTechnologies = async () => {
  const frameworks = useState('frameworks', () => [])
  const modules = useState('modules', () => [])
  const plugins = useState('plugins', () => [])
  const uis = useState('uis', () => [])
  const { find } = useStrapi3()

  const entities = ['frameworks', 'modules', 'plugins', 'uis']

  await Promise.all(
    entities.map(async (entity) => {
      const { data } = await useAsyncData(entity, () => find(entity))

      if (!data.value.length) {
        return
      }
      const technologies = data.value.map(({ slug, name, imgPath, url }) => ({
        slug,
        name,
        imgPath,
        url
      }))

      technologies.sort((a, b) => a.name.localeCompare(b.name))

      switch (entity) {
        case 'frameworks':
          frameworks.value = technologies
          break
        case 'modules':
          modules.value = technologies
          break
        case 'plugins':
          plugins.value = technologies
          break
        case 'uis':
          uis.value = technologies
          break
      }
    })
  )

  return { frameworks, modules, plugins, uis }
}
