export default eventHandler((event) => {
  if (process.env.NODE_ENV === 'production') {
    // Cache for 1 hour
    handleCacheHeaders(event, {
      maxAge: 3540,
      cacheControls: ['stale-while-revalidate=60']
    })
  }
})
