<template>
  <div class="overflow-hidden">
    <HeroPropositionSection
      class="mt-24 md:mt-32 max-w-readable px-4 mx-auto"
    />
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#imports'
const { $gsap } = useNuxtApp()
</script>
