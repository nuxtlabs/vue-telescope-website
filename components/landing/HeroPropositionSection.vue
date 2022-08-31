<template>
  <section id="hero-proposition" class="flex flex-col items-center">
    <h1
      ref="headingRef"
      class="inline-flex flex-col items-center mb-12 text-center text-two leading-two md:text-one md:leading-one font-bold-body-weight -tracking-4"
    >
      <div class="opacity-0">
        Discover websites
      </div>
      <div class="opacity-0">
        made with
      </div>
      <div class="w-full -z-1">
        <HeroPropositionBrandsRotator />
      </div>
    </h1>

    <div ref="lookupInputRef" class="m-auto mb-12 opacity-0 max-w-readable">
      <LookupInput />
    </div>

    <p
      ref="subheadingRef"
      class="max-w-2xl mb-12 text-center opacity-0 text-eight leading-eight md:text-seven md:leading-seven text-grey-700"
    >
      Reveal the Vue plugins and technology stack powering any website or
      explore our database of <strong>{{ showcasesCount.toLocaleString() }} websites</strong>.
    </p>
    <InstallExtensionButton
      ref="installExtensionButtonRef"
      size="large"
      class="mb-8 opacity-0"
    />
  </section>
</template>

<script setup lang="ts">
import { animate, stagger, timeline } from 'motion'

const headingRef = ref(null)
const lookupInputRef = ref(null)
const subheadingRef = ref(null)
const installExtensionButtonRef = ref(null)

const showcasesCount = useShowcasesCount()

onMounted(() => {
  timeline([
    [[headingRef.value?.children[0], headingRef.value?.children[1]], { opacity: 0, scale: 0.75 }, { duration: 0 }],
    [[headingRef.value?.children[0], headingRef.value?.children[1]], { opacity: 1, scale: 1 }, { duration: 0.45, delay: stagger(0.05), easing: 'ease-out' }]
  ])

  timeline([
    [lookupInputRef.value, { opacity: 0, scale: 0.75, y: '-15px', filter: 'blur(20px)' }, { duration: 0 }],
    [lookupInputRef.value, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }, { delay: 0.3, duration: 0.25, easing: 'ease-out' }]
  ])

  timeline([
    [subheadingRef.value, { opacity: 0, scale: 0.75, filter: 'blur(20px)' }, { duration: 0 }],
    [subheadingRef.value, { opacity: 1, scale: 1, filter: 'blur(0px)' }, { delay: 0.4, duration: 0.25, easing: 'ease-out' }]
  ])

  timeline([
    [installExtensionButtonRef.value.$el, { opacity: 0, scale: 0.75, y: '-10px', filter: 'blur(20px)' }, { duration: 0 }],
    [installExtensionButtonRef.value.$el, { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }, { delay: 0.4, duration: 0.25, easing: 'ease-out' }]
  ])
})
</script>
