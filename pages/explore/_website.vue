<template>
  <div>
    <!-- <ExploreWebsite /> -->
    <div v-if="twitterLike">
      <!-- <transition name="page"> -->
      <ModalWrapper>
        <ExploreWebsite :website="website" class="mb-12" />
        <CtaSection />
      </ModalWrapper>
      <!-- </transition> -->
    </div>
    <div v-else class="px-4">
      <!-- <transition name="page"> -->
      <ExploreWebsite
        :website="website"
        class="max-w-container-max-width m-auto"
      />
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  },
  mounted() {
    console.log('mounted', this.$route)
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
