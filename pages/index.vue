<template>
  <div class="h-full w-full relative text-primary-500">
    <h1>hello, Vue Telescope</h1>
    <HeroPropositionBrandsRotator />
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useHead } from '#imports'

const { $gsap } = useNuxtApp()

useHead({
  bodyAttrs: {
    class: ['font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body min-h-screen']
  }
})
</script>
