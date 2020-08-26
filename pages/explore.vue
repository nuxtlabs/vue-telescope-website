<template>
  <div class="pt-12 md:pt-8 mb-8">
    <ExploreShowcasesSection
      v-if="!$route.params.website || ($route.params.website && twitterLike)"
    />
    <NuxtChild :key="$route.params.website" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import frontMatter from '@/utils/front-matter'

export default {
  // scrollToTop: true,
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
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
