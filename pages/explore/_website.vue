<template>
  <div>
    <div v-if="twitterLike">
      <TwitterLikeModalWrapper
        :fetched="website ? true : false"
        @close="$router.push('/explore')"
      >
        <!-- <ExploreShowcasePlaceholders v-if="$fetchState.pending" class="p-4" /> -->
        <ExploreShowcase :website="website" class="twitter-like mb-12" />
        <CtaSection />
      </TwitterLikeModalWrapper>
    </div>

    <div v-else class="px-4 xl:px-8">
      <!-- Direct hit view placeholders -->
      <ExploreShowcasePlaceholders v-if="$fetchState.pending" />

      <template v-else-if="$fetchState.error">
        <LazyErrorSection :error="$fetchState.error" />
      </template>

      <!-- Direct hit view -->
      <ExploreShowcase
        v-else
        :website="website"
        class="max-w-readable-line-length xl:max-w-container-max-width m-auto"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import frontMatter from '@/utils/front-matter'
import cache from '@/utils/cache'

export default {
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
  // scrollToTop: true,
  data() {
    return {
      website: null
    }
  },
  fetchOnServer: false,
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  },
  // activated() {
  //   if (this.$fetchState.timestamp <= Date.now() - 60000) {
  //     this.$fetch()
  //   }
  // },
  head() {
    return frontMatter({
      path: this.$route.path,
      title: (this.website && this.website.title) || 'Loading...',
      noindex: true
    })
  }
}
</script>

<style></style>
