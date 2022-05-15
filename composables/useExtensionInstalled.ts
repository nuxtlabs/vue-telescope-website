import { ref, onMounted } from '#imports'

export const useExtensionInstalled = () => {
  const isExtensionInstalled = ref(false)

  onMounted(() => {
    isExtensionInstalled.value =
      Boolean(window.$vueTelemetryExtension) ||
      Boolean(window.$vueTelescopeExtension)
  })

  return { isExtensionInstalled }
}
