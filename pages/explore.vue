<template>
  <div>
    <ExplorePage
      v-if="!$route.params.website || ($route.params.website && !directHit)"
    />

    <NuxtPage :key="$route.params.website" />
  </div>
</template>

<script setup lang="ts">
const { $directHit: directHit } = useNuxtApp()
</script>
