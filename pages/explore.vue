<template>
  <div>
    <NuxtLink to="/explore/phdsolutions-org" class="block">test</NuxtLink>

    <ExplorePage
      v-if="!$route.params.website || ($route.params.website && !directHit)"
    />

    <NuxtPage :key="$route.params.website" />
  </div>
</template>

<script setup lang="ts">
const { $directHit: directHit } = useNuxtApp()
</script>
