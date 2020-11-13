class CacheService {
  store = new Map()

  set(key, data) {
    this.store.set(key, {
      timestamp: Date.now(),
      data
    })
  }

  get(key, ttl = 60000) {
    const cached = this.store.get(key)

    if (!cached) return null
    if (cached.timestamp <= Date.now() - ttl) {
      this.store.delete(key)
      return null
    }
    return cached.data
  }
}

export default new CacheService()
