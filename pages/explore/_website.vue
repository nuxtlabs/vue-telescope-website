<template>
  <div>
    <!-- <ExploreWebsite /> -->
    <div v-if="twitterLike">
      <!-- <transition name="page"> -->
      <TwitterLikeModalWrapper :fetched="website ? true : false">
        <ExploreWebsite :website="website" class="twitter-like mb-12" />
        <CtaSection />
      </TwitterLikeModalWrapper>
      <!-- </transition> -->
    </div>
    <div v-else class="px-4">
      <!-- <transition name="page"> -->
      <div
        v-if="$fetchState.pending"
        class="max-w-readable-line-length m-auto mt-10"
      >
        <ContentPlaceholders rounded>
          <ContentPlaceholdersText class="custom h-2 w-32 mb-2" :lines="1" />
          <ContentPlaceholdersText class="custom h-8 w-2/3 mb-8" :lines="1" />
          <ContentPlaceholdersText
            class="custom relative h-full w-full mb-4 rounded-xl overflow-hidden"
            :lines="1"
            style="padding-bottom: 75%;"
          />
          <ContentPlaceholdersText :lines="8" />
        </ContentPlaceholders>
      </div>
      <ExploreWebsite
        v-else
        :website="website"
        class="max-w-readable-line-length m-auto"
      />
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { fetchStrapi } from '@/functions/utils'

export default {
  async fetch() {
    // const website = await this.$strapi.find(
    //   `showcases?slug=${this.$route.params.website}`
    // )
    try {
      const website = await this.$strapi.findOne(
        'showcases',
        this.$route.params.website
      )
      if (website) {
        this.website = website
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
  mounted() {
    // console.log('mounted', this.$route)
  },
  activated() {
    // console.log('ACTIVATED')
    // console.log('ISSUE:', this.$route)

    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch()
    }
  }
}
</script>

<style></style>
