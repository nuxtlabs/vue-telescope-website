export default defineNuxtPlugin(async () => {
  const lastSeenAt = useState('lastSeenAt', () => null)

  const updatedAt = useState('updatedAt', () => null)

  if (!updatedAt.value) {
    const data = await queryContent('changelog').only(['updatedAt']).findOne()
    updatedAt.value = data.updatedAt
  }

  const hasSeen = computed(() => {
    if (!lastSeenAt.value) { return false }
    return new Date(lastSeenAt.value) >= new Date(updatedAt.value)
  })

  function saw () {
    lastSeenAt.value = updatedAt.value
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
