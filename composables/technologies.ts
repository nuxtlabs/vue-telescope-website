export const useTechnologies = () => {
  return useState('technologies', () => ({
    frameworks: [],
    modules: [],
    plugins: [],
    uis: [],
    loaded: false
  }))
}

export const fetchTechnologies = async () => {
  const technologies = useTechnologies()

  if (!technologies.value.loaded) {
    const { find } = useStrapi3()

    const entities = ['frameworks', 'modules', 'plugins', 'uis']

    await Promise.all(
      entities.map(async (entity) => {
        let data: any = await find(entity)

        if (!data?.length) {
          return
        }
        data = data.map(({ slug, name, imgPath, url }) => ({
          slug,
          name,
          imgPath,
          url
        }))

        data.sort((a, b) => a.name.localeCompare(b.name))

        technologies.value[entity] = data
      })
    )
    technologies.value.loaded = true
  }

  return technologies
}
