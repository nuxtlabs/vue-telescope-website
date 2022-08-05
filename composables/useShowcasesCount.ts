export const useShowcasesCount = () => {
  const showcasesCount = useState('showcasesCount', () => null)
  const { find } = useStrapi3()

  async function fetch () {
    if (showcasesCount.value) {
      return
    }

    const { data } = await useAsyncData('showcases/count', () =>
      find('showcases/count')
    )
    showcasesCount.value = data.value
  }

  return {
    showcasesCount,
    fetch
  }
}
