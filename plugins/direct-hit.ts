import { defineNuxtPlugin, ref, watch } from '#imports'

export default defineNuxtPlugin((ctx: any) => {
  const directHit = ref(true)

  const once = ctx.$router.afterEach((to, from) => {
    console.log('to', to)
    console.log('from', from)
    if (from.name !== to.name) {
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
