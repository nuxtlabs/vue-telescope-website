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

<script setup lang="ts">
defineProps({
  showcases: {
    type: Array,
    default: null
  }
})

function openLinkHandler(showcase) {
  // TODO: seems to work without it
  // this.$store.commit('SET_MODAL', true)
  // this.$router.push(`/explore/${showcase.slug}`)
}
</script>
