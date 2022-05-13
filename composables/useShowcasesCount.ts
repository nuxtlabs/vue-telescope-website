import { ref, useAsyncData } from '#imports'

export const useShowcasesCount = async () => {
  const showcasesCount = ref()
  const { find } = useStrapi4()

  const { data } = await useAsyncData('showcases/count', () =>
    find('showcases/count')
  )
  showcasesCount.value = data

  return { showcasesCount }
}
