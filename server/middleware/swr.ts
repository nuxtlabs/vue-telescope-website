export default eventHandler((event) => {
  if (process.env.NODE_ENV === 'production') {
    // Cache for 1 hour
    event.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=3599')
  }
})
