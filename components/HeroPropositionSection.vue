<template>
  <section id="hero-proposition" class="flex flex-col items-center">
    <h1
      ref="heading"
      class="inline-flex flex-col items-center text-center text-two leading-two md:text-one md:leading-one font-bold-body-weight -tracking-4 mb-12"
    >
      <div class="opacity-0">Discover websites</div>
      <div class="opacity-0">made with</div>
      <div class="opacity-0 w-full -z-1">
        <HeroPropositionBrandsRotator />
      </div>
    </h1>
  </section>
</template>

<script setup lang="ts">
import { onMounted, useNuxtApp, ref } from '#imports'

const heading = ref()

const { $gsap } = useNuxtApp()

onMounted(() => {
  $gsap.fromTo(
    heading.value.children,
    {
      opacity: 0,
      scale: 0.75
    },
    {
      opacity: 1,
      scale: 1,
      stagger: 0.05,
      duration: 0.45,
      ease: 'power4.inOut'
    }
  )
})
</script>
