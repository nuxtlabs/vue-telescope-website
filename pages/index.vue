<template>
  <div class="">
    <section
      id="hero"
      class="mt-56 max-w-readable-line-length px-4 mx-auto flex flex-col items-center"
    >
      <h1
        class="text-center text-two leading-two md:text-one md:leading-one font-bold-body-weight -tracking-4 mb-4"
      >
        Discover websites <br />
        made with Vue.js
      </h1>
      <p
        class="text-center text-seven leading-seven text-grey-500 mb-12 max-w-2xl"
      >
        Explore the Web with Vue Telemetry and reveal the Vue technologies used
        on any website and our database consist of 5000+ websites.
      </p>
      <VtButton size="large" appearance="primary" class="mb-16">
        Add to Chrome
      </VtButton>
      <SearchInput class="" />
    </section>
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
