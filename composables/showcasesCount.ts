export const useShowcasesCount = () => {
  return useState('showcasesCount', () => null)
}

export const fetchShowcasesCount = async () => {
  const showcasesCount = useShowcasesCount()
  const { find } = useStrapi3()

  if (showcasesCount.value === null) {
    showcasesCount.value = await find('showcases/count')
  }
  return showcasesCount
}
