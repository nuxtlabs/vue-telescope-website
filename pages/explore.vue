<template>
  <div>
    <ExploreShowcasesGrid
      v-if="!$route.params.website || ($route.params.website && twitterLike)"
      id="explore-showcases-grid"
      :showcases="showcases"
      class="px-2"
    />

    <!-- <transition name="page"> -->
    <NuxtChild :key="$route.params.website" keep-alive />
    <!-- </transition> -->

    <!-- <div v-if="$route.params.website">
      <div v-if="twitterLike">
        <transition name="page">
          <ModalWrapper>
            <NuxtChild keep-alive />
          </ModalWrapper>
        </transition>
      </div>
      <div v-else>
        <transition name="page">
          <NuxtChild keep-alive />
        </transition>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fetchStrapi } from '@/functions/utils'

export default {
  // async asyncData({ app }) {
  //   const showcases = await fetchStrapi(
  //     'https://vue-telemetry-api.herokuapp.com/showcases',
  //     { method: 'get' }
  //   )
  //   return {
  //     showcases
  //   }
  // },
  async fetch() {
    const showcases = await fetchStrapi(
      'https://vue-telemetry-api.herokuapp.com/showcases',
      { method: 'get' }
    )
    if (showcases.length) {
      this.showcases = showcases
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Showcases not found')
    }
  },
  data() {
    return {
      showcases: null
    }
  },
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  }
}
</script>
