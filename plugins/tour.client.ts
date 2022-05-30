import { defineNuxtPlugin, ref, useState } from '#imports'

export default defineNuxtPlugin(() => {
  const collectionsFeature = useState('collectionsFeature', () => 'boom')
  collectionsFeature.value = Boolean(
    window.localStorage.getItem('collections-feature-seen')
  )

  return {
    provide: {
      tour: {
        collectionsFeature
      }
    }
  }
})
