<template>
  <div class="">
    <!-- <pre>
      {{ featured }}
    </pre> -->
    <HeroPropositionSection
      class="mt-56 max-w-readable-line-length px-4 mx-auto"
    />
    <HeroPresentationSection :featured="featured" class="" />
    <FeaturesSection class="my-8 px-4 max-w-container-max-width m-auto" />
    <BenefitsSection class="my-8 px-4 max-w-container-max-width m-auto" />
    <CtaSection class="my-8" />
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    // https://vue-telemetry-api.herokuapp.com/showcases/count
    // https://vue-telemetry-api.herokuapp.com/showcases/featured
    const featured = await fetch(
      'https://vue-telemetry-api.herokuapp.com/showcases/featured'
    )
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        throw new Error(err)
      })
    return {
      featured: featured.map((item, index) => {
        return { ...item, index }
      })
    }
  },
  methods: {
    // handleClick(slug) {
    //   this.$router.push(`/explore?preview=${slug}`)
    // }
  }
}
</script>

<style></style>
