export default eventHandler((event) => {
  if (process.env.NODE_ENV === 'production') {
    // skip cache if user is authenticated
    if (getCookie(event, 'strapi_jwt')) {
      return
    }
    // Cache for 1 hour
    handleCacheHeaders(event, {
      maxAge: 3540,
      cacheControls: ['stale-while-revalidate=60']
    })
  }
})
