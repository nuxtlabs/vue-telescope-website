<template>
  <div class="text-primary-500">
    <h1>hello, Vue Telescope</h1>
    <HeroPropositionBrandsRotator />
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#imports'
const { $gsap } = useNuxtApp()
</script>
