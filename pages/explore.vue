<template>
  <div>
    <ExploreShowcasesGrid
      v-if="!$route.params.website || ($route.params.website && twitterLike)"
      :showcases="showcases"
    />

    <NuxtChild />

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
  async asyncData({ app }) {
    const showcases = await fetchStrapi(
      'https://vue-telemetry-api.herokuapp.com/showcases',
      { method: 'get' }
    )
    return {
      showcases
    }
  },
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  }
}
</script>
