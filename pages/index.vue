<script setup lang="ts">
useSeoMeta({
  // title: 'NuxtLabs',
  // ogTitle: 'NuxtLabs',
  // description: 'Building the bridge between open-source software development and enterprise-grade web solutions.',
  // ogDescription: 'Building the bridge between open-source software development and enterprise-grade web solutions.',
  // ogImage: 'https://nuxtlabs.com/social.png',
  // twitterImage: 'https://nuxtlabs.com/social.png'
})

definePageMeta({
  colorMode: 'dark'
})

const { data: page } = await useAsyncData('/', () => queryContent('/').findOne())

</script>

<template>
  <UMain>
    <ULandingHero :ui="{ title: 'text-5xl sm:text-6xl z-10', description: 'dark:text-gray-400' }" class="relative">
      <template #title>
        <h1 v-html="page.hero.title" />
      </template>
      <template #description>
        <p v-html="page.hero.description" />
      </template>
      <div class="flex justify-center w-full">
        <SelectExtension />
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="w-[800px] h-[450px] mb-20 bg-gradient" />
      </div>
    </ULandingHero>

    <ULandingSection :title="page.feature.title">
      <UPageGrid>
        <UPageCard v-for="(feature, index) in page.feature.features" :key="index" v-bind="feature" :ui="{ background: 'bg-card-feature', title: 'text-xl', icon: { wrapper: 'mb-4', base: 'text-white' } }" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection :title="page.extension.title" :description="page.extension.description" align="left">
      <NuxtImg :src="page.extension.img.src" :width="page.extension.img.width" :height="page.extension.img.height" />
    </ULandingSection>
  </UMain>
</template>

<style scoped lang="postcss">
.bg-gradient {
  opacity: 0.25;
  background: radial-gradient(50% 50% at 50% 50%, #00DC82 0%, #020420 100%);
  backdrop-filter: blur(20px);
  z-index: -1;
}

.bg-card-feature {
  background: linear-gradient(0deg, rgba(2, 4, 32, 0.60) 0%, rgba(2, 4, 32, 0.60) 100%), linear-gradient(180deg, #1E293B 0%, #0F172A 33.92%);
}
</style>
