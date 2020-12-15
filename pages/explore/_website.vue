<template>
  <div>
    <div v-if="directHit" class="px-4 xl:px-8">
      <!-- Direct hit view placeholders -->
      <ShowcasePlaceholder v-if="$fetchState.pending" />

      <template v-else-if="$fetchState.error">
        <LazyErrorSection :error="$fetchState.error" />
      </template>

      <!-- Direct hit view -->
      <ExploreShowcase
        v-else
        :website="website"
        class="max-w-readable-line-length xl:max-w-container m-auto"
      />
    </div>

    <div v-else>
      <TwitterLikeModalWrapper
        :fetched="website ? true : false"
        @close="$router.push('/explore')"
      >
        <!-- <ExploreShowcasePlaceholders v-if="$fetchState.pending" class="p-4" /> -->
        <ExploreShowcase :website="website" class="twitter-like mb-12" />
        <CtaSection />
      </TwitterLikeModalWrapper>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import frontMatter from '@/utils/front-matter'
import cache from '@/utils/cache'

export default {
  name: 'ExploreWebsitePage',
  // scrollToTop: true,
  data() {
    return {
      website: null
    }
  },
  async fetch() {
    const cached = cache.get(this.$route.params.website)
    if (cached) {
      this.website = cached
      return
    }
    try {
      const website = await this.$strapi.findOne(
        'showcases',
        this.$route.params.website
      )
      if (website) {
        this.website = website
        cache.set(this.$route.params.website, website)
      } else {
        // set status code on server
        if (process.server) {
          this.$nuxt.context.res.statusCode = 404
        }
        throw new Error('Website not found')
      }
    } catch (err) {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('Website not found')
    }
  },
  fetchOnServer: false,
  head() {
    return frontMatter({
      path: this.$route.path,
      title: (this.website && this.website.title) || 'Loading...',
      noindex: true
    })
  },
  computed: {
    ...mapState({
      directHit: (state) => state.directHit
    })
  }
  // activated() {
  //   if (this.$fetchState.timestamp <= Date.now() - 60000) {
  //     this.$fetch()
  //   }
  // },
}
</script>
