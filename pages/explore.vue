<template>
  <div class="pt-12 md:pt-8 mb-8">
    <ExplorePage
      v-if="!$route.params.website || ($route.params.website && !directHit)"
    />
    <NuxtChild :key="$route.params.website" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import frontMatter from '@/utils/front-matter'

export default {
  name: 'Explore',
  // scrollToTop: true,
  data() {
    return {
      newTwitterLike: false
    }
  },
  computed: {
    ...mapState({
      directHit: (state) => state.directHit
    })
  },
  beforeRouteEnter(to, from, next) {
    if (process.browser) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 50)
    }
    next()
  },
  head() {
    return frontMatter({
      path: this.$route.path,
      title: 'Explore Vue.js showcases',
      noindex: false
    })
  }
}
</script>
