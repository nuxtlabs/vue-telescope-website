import { defineNuxtPlugin, ref, useState } from '#imports'

export default defineNuxtPlugin(() => {
  const collectionsFeature = useState('collectionsFeature', () => false)
  collectionsFeature.value = Boolean(
    window.localStorage.getItem('collectionsFeatureSeen') === 'true'
  )

  return {
    provide: {
      tour: {
        collectionsFeature
      }
    }
  }
})
