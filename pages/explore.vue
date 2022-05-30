<template>
  <div>
    explore

    {{ $directHit }}

    <NuxtLink to="/explore/phdsolutions-org">test</NuxtLink>

    <NuxtPage :key="$route.params.website" />
  </div>
</template>

<script setup lang="ts">
// const { $directHit } = useNuxtApp()
// console.log('runnung', $directHit.value)
</script>
