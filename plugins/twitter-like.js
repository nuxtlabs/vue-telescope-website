export default function ({ app, store }) {
  app.router.afterEach((to, from) => {
    if (from.name) {
      store.commit('SET_TWITTER_LIKE')
      // next()
    }
    // next()
  })
}
