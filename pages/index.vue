<template>
  <div class="">
    <!-- <HeroSection class="mt-56 max-w-readable-line-length px-4 mx-auto" /> -->
    <FeaturesSection class="my-8 px-4 max-w-container-max-width m-auto" />
    <CtaSection class="my-8" />
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    // https://vue-telemetry-api.herokuapp.com/showcases/count
    // https://vue-telemetry-api.herokuapp.com/showcases/featured
  },
  methods: {
    // handleClick(slug) {
    //   this.$router.push(`/explore?preview=${slug}`)
    // }
  }
}
</script>

<style></style>
