<template>
  <div>
    {{ website }}
  </div>
</template>

<script>
import { fetchStrapi } from '@/functions/utils'

export default {
  async fetch() {
    const website = await fetchStrapi(
      `https://vue-telemetry-api.herokuapp.com/showcases?slug=${this.$route.params.website}`,
      { method: 'get' }
    )
    if (website.length) {
      this.website = website[0]
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Website not found')
    }
  },
  data() {
    return {
      website: null
    }
  },
  activated() {
    console.log('ACTIVATED')
    console.log('ISSUE:', this.$route)

    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  }
}
</script>

<style></style>
