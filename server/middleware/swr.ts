export default eventHandler((event) => {
  if (process.env.NODE_ENV === 'production') {
    event.res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate=80')
  }
})
