<template>
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
</template>

<script>
export default {
  props: {
    showcases: {
      type: Array,
      default: null
    }
  },
  methods: {
    openLinkHandler(showcase) {
      this.$store.commit('SET_MODAL', true)
      this.$router.push(`/explore/${showcase.slug}`)
    }
  }
}
</script>

<style></style>
