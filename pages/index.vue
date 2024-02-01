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
        <SelectExtension class="z-10" />
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="w-[800px] h-[450px] mb-20 bg-gradient" />
      </div>
    </ULandingHero>

    <ULandingSection :title="page.feature.title">
      <UPageGrid>
        <UPageCard v-for="(feature, index) in page.feature.features" :key="index" v-bind="feature"
          :ui="{ background: 'bg-card-feature', title: 'text-xl', icon: { wrapper: 'mb-4', base: 'text-white' } }" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection :title="page.extension.title" :description="page.extension.description" align="center"
      class="relative" :ui="{ container: 'lg:grid lg:grid-cols-2 items-center lg:justify-between', title: 'text-center lg:text-left', description: 'text-center lg:text-left' }">
      <NuxtImg :src="page.extension.img.src" :width="page.extension.img.width" :height="page.extension.img.height" />

      <div class="absolute top-0 flex items-center justify-center left-[40%]">
        <span class="w-[500px] h-[500px] bg-gradient" />
      </div>
    </ULandingSection>

    <ULandingSection align="right" :title="page.showcase.title" :description="page.showcase.description"
    :ui="{ container: 'lg:grid lg:grid-cols-2 items-center lg:justify-between', title: 'text-center lg:text-left', description: 'text-center lg:text-left' }">
      <div class="grid grid-cols-4 gap-4 sm:grid-cols-5 lg:grid-cols-5 sm:gap-5 lg:gap-8">
        <NuxtLink v-for="(showcase, index) in page.showcase.showcases" :key="index" :to="showcase.to" target="_blank"
          class="flex justify-center block transition lg:hover:scale-110">
          <NuxtImg :src="showcase.src" :alt="showcase.alt" loading="lazy" class="rounded-xl" height="90" width="90" :placeholder="[90, 90, 75, 5]" />
        </NuxtLink>
      </div>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA align="left" card :ui="{ background: 'bg-cta relative', body: { base: 'items-center text-center', background: 'dark:bg-gray-950/60 ', padding: 'py-16 sm:py-[72px] rounded-xl' }}">
        <template #title>
          <span v-html="page.cta.title" />
        </template>

        <div class="absolute inset-x-0 top-0 flex items-center justify-center ">
          <NuxtImg src="/images/gradient.svg" width="648" />
        </div>

        <div class="flex lg:justify-end">
          <SelectExtension class="w-full md:w-60" />
        </div>
      </ULandingCTA>
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

.bg-gradient-cta {
  opacity: 0.25;
  background: radial-gradient(50% 50% at 50% 50%, #00DC82 0%, rgba(0, 220, 130, 0.00) 100%);
  backdrop-filter: blur(20px);
}

.bg-card-feature {
  background: linear-gradient(0deg, rgba(2, 4, 32, 0.60) 0%, rgba(2, 4, 32, 0.60) 100%), linear-gradient(180deg, #1E293B 0%, #0F172A 33.92%);
}

.bg-cta {
  background: linear-gradient(180deg, #1E293B 0%, #0F172A 33.92%);
}
</style>
