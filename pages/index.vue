<template>
  <div class="overflow-hidden">
    <HeroPropositionSection
      class="mt-32 md:mt-40 max-w-readable-line-length px-4 mx-auto"
    />
    <HeroPresentationSection :featured="featured" class="" />
    <FeaturesSection class="px-4 max-w-container-max-width m-auto" />
    <BenefitsSection class="px-4 max-w-container-max-width m-auto" />
    <CtaSection class="" />
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
      path: this.$route.path
    })
  }
}
</script>

<style></style>
