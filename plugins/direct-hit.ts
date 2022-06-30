export default defineNuxtPlugin((ctx: any) => {
  const directHit = useState('direct-hit-status', () => true)

  const once = ctx.$router.afterEach((to, from) => {
    if (from.path !== to.path) {
      directHit.value = false
      once()
    }
  })

  return {
    provide: {
      directHit
    }
  }
})
