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
</script>
