import { useState } from '#imports'

export default defineNuxtPlugin(async () => {
  const lastSeenAt = useState('lastSeenAt', () => null)

  const {
    data: {
      value: { updatedAt }
    }
  } = await useAsyncData('changelog', () => {
    return queryContent('changelog').only(['updatedAt']).findOne()
  })

  const hasSeen = computed(() => {
    if (!lastSeenAt.value) { return false }

    return new Date(lastSeenAt.value) >= new Date(updatedAt)
  })

  function saw () {
    lastSeenAt.value = updatedAt
    localStorage.setItem('changelog_seen_at', lastSeenAt.value)
  }

  if (process.client) {
    lastSeenAt.value = localStorage.getItem('changelog_seen_at')
  }

  return {
    provide: {
      changelog: {
        updatedAt,
        lastSeenAt,
        hasSeen,
        saw
      }
    }
  }
})
