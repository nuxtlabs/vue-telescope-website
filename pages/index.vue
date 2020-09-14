<template>
  <div class="overflow-hidden">
    <HeroPropositionSection
      class="mt-24 md:mt-32 max-w-readable-line-length px-4 mx-auto"
    />
    <HeroPresentationSlider
      :featured="featured"
      class="optimize-rendering my-24"
    />
    <FeaturesSection
      class="optimize-rendering px-4 max-w-container-max-width m-auto"
    />
    <BenefitsSection
      class="optimize-rendering px-4 max-w-container-max-width m-auto"
    />
    <CtaSection class="optimize-rendering" />
  </div>
</template>

<script>
import frontMatter from '@/utils/front-matter'

export default {
  async fetch() {
    const featured = await this.$strapi.find(
      'showcases?isFeatured=true&_limit=5'
    )
    this.featured = featured.map((item, index) => {
      return { ...item, index }
    })
  },
  data() {
    return {
      featured: []
    }
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
