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

    <div ref="lookupInput" class="opacity-0 max-w-readable m-auto mb-12">
      <LookupInput class="" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, useNuxtApp, ref } from '#imports'

const heading = ref()
const lookupInput = ref()

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

  $gsap.fromTo(
    lookupInput.value,
    {
      opacity: 0,
      scale: 0.75,
      y: '15px'
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      delay: 0.5,
      ease: 'power4.inOut',
      clearProps: true,
      onComplete() {
        lookupInput.value.classList.remove('opacity-0')
      }
    }
  )
})
</script>
