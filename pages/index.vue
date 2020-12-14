<template>
  <div class="overflow-hidden">
    <HeroPropositionSection
      class="mt-24 md:mt-32 max-w-readable-line-length px-4 mx-auto"
    />
    <HeroPresentationSlider :featured="featured" class="my-24" />
    <FeaturesSection class="px-4 max-w-container m-auto" />
    <BenefitsSection class="px-4 max-w-container m-auto" />
    <CtaSection class="" />
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  data() {
    return {
      featured: []
    }
  },
  async fetch() {
    const featured = await this.$strapi.find(
      'showcases?isFeatured=true&_limit=5'
    )
    this.featured = featured.map((item, index) => {
      return { ...item, index }
    })
  },
  fetchOnServer: false,
  head() {
    return frontMatter({
      path: this.$route.path,
      noindex: false
    })
  }
}
</script>

<style></style>
