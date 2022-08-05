import { useState, onMounted } from '#imports'

export const useExtensionInstalled = () => {
  const isExtensionInstalled = useState('isExtensionInstalled', () => false)

  onMounted(() => {
    isExtensionInstalled.value =
      Boolean(window.$vueTelemetryExtension) ||
      Boolean(window.$vueTelescopeExtension)
  })

  return { isExtensionInstalled }
}
