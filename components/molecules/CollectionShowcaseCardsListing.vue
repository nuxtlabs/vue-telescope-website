<template>
  <div>
    <TwitterLikeModalWrapper
      v-if="activeShowcase"
      :fetched="activeShowcase ? true : false"
      @close="activeShowcase = false"
    >
      <!-- <pre v-if="activeShowcase">
              {{ activeShowcase }}
            </pre> -->
      <ShowcaseSection :website="activeShowcase" class="twitter-like mb-12" />
      <CtaSection />
    </TwitterLikeModalWrapper>

    <div class="w-full flex flex-wrap">
      <ShowcaseCard
        v-for="(showcase, index) in showcases"
        :key="showcase.id"
        :data-index="index"
        :showcase="showcase"
        class="w-full sm:w-1/2 md:w-1/3 mb-4"
        @open-link="openLinkHandler(showcase)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showcases: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      activeShowcase: null
    }
  },
  methods: {
    async openLinkHandler(showcase) {
      // fetch full showcase data
      const fullShowcase = await this.$strapi.findOne(
        'showcases',
        showcase.slug
      )
      // proceed
      this.$store.commit('SET_MODAL', true)
      this.activeShowcase = fullShowcase
    }
  }
}
</script>
