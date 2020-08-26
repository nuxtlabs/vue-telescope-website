class CacheService {
  requests = new Map()

  setCache(key, data) {
    this.requests.set(key, data)
  }

  getCache(key) {
    return this.requests.get(key).body
  }

  isInvalidCache(key, ttl = 60000) {
    return (
      !this.requests.get(key) ||
      this.requests.get(key).timestamp <= Date.now() - ttl
    )
  }
}

export default new CacheService()
