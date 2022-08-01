<template>
  <div class="pt-12 md:pt-8 mb-8">
    <ExplorePage
      v-if="!$route.params.showcase || ($route.params.showcase && !directHit)"
    />

    <NuxtPage :key="$route.params.showcase" />
  </div>
</template>

<script setup lang="ts">
const { $directHit: directHit } = useNuxtApp()

useFrontMatter({
  title: 'Explore Vue.js showcases'
})

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
