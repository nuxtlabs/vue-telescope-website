<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

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

const breakpoints = useBreakpoints(breakpointsTailwind)

const mdAndLarger = breakpoints.greaterOrEqual('md')
const lgAndLarger = breakpoints.greaterOrEqual('lg')
const xlAndLarger = breakpoints.greaterOrEqual('xl')

const { data: page } = await useAsyncData('/', () => queryContent('/').findOne())

const [{ data: analyserContributors }, { data: websiteContributors }, { data: extensionsContributors }, { data: stars }] = await Promise.all([
  useFetch<any>(`https://ungh.cc/repos/nuxtlabs/vue-telescope-website/contributors`),
  useFetch<any>(`https://ungh.cc/repos/nuxtlabs/vue-telescope-analyzer/contributors`),
  useFetch<any>(`https://ungh.cc/repos/nuxtlabs/vue-telescope-extensions/contributors`),
  useFetch<any>(`https://ungh.cc/stars/nuxtlabs/vue-telescope-extensions+nuxtlabs/vue-telescope-website+nuxtlabs/vue-telescope-analyzer`)
])

const contributors = computed(() => [...new Set([
  ...analyserContributors.value.contributors,
  ...websiteContributors.value.contributors,
  ...extensionsContributors.value.contributors]
  .flatMap(({ username }) => username))])

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

    <ULandingSection :title="page.extension.title" :description="page.extension.description" align="left"
      class="relative">
      <NuxtImg :src="page.extension.img.src" :width="page.extension.img.width" :height="page.extension.img.height" />

      <div class="absolute top-0 flex items-center justify-center left-[40%]">
        <span class="w-[500px] h-[500px] bg-gradient" />
      </div>
    </ULandingSection>

    <ULandingSection align="right" :title="page.showcase.title" :description="page.showcase.description">
      <div class="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-10 lg:grid-cols-5 sm:gap-5 lg:gap-8">
        <NuxtLink v-for="(showcase, index) in page.showcase.showcases" :key="index" :to="showcase.to" target="_blank"
          class="block transition lg:hover:scale-110">
          <img :src="showcase.src" :alt="showcase.alt" loading="lazy" class="rounded-xl">
        </NuxtLink>
      </div>
    </ULandingSection>

    <ULandingSection>
      <ULandingCTA align="left" card :ui="{ background: 'bg-cta', body: { background: 'dark:bg-gray-950/60', padding: 'py-16 sm:py-[72px] rounded-xl' }}">
        <template #title>
          <span v-html="page.cta.title" />
        </template>

        <template #links>
          <ClientOnly>
            <UAvatarGroup :max="xlAndLarger ? 13 : lgAndLarger ? 10 : mdAndLarger ? 16 : 8" size="md"
              class="flex-wrap-reverse [&_span:first-child]:text-xs justify-center">
              <UTooltip v-for="(username, index) of contributors" :key="index" :text="username" class="rounded-full"
                :ui="{ background: 'bg-gray-50 dark:bg-gray-800/50' }" :popper="{ offsetDistance: 16 }">
                <UAvatar :alt="username" :src="`https://ipx.nuxt.com/s_40x40/gh_avatar/${username}`"
                  :srcset="`https://ipx.nuxt.com/s_80x80/gh_avatar/${username} 2x`"
                  class="transition-transform lg:hover:scale-125 lg:hover:ring-2 lg:hover:ring-primary-500 dark:lg:hover:ring-primary-400"
                  width="40" height="40" size="md" loading="lazy">
                  <NuxtLink :to="`https://github.com/${username}`" :aria-label="username" target="_blank"
                    class="focus:outline-none" tabindex="-1">
                    <span class="absolute inset-0" aria-hidden="true" />
                  </NuxtLink>
                </UAvatar>
              </UTooltip>
            </UAvatarGroup>
          </ClientOnly>
        </template>

        <div class="flex flex-col items-center justify-center gap-8 sm:flex-row lg:gap-16">
          <!-- <NuxtLink class="text-center group" to="https://npmjs.org/package/@nuxt/ui" target="_blank">
          <p
            class="text-6xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400">
            {{ format(module.stats.downloads) }}+
          </p>
          <p>monthly downloads</p>
        </NuxtLink> -->

          <NuxtLink class="text-center group" to="https://github.com/nuxt/ui" target="_blank">
            <p
              class="text-6xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400">
              {{ stars.totalStars }}+
            </p>
            <p>stars</p>
          </NuxtLink>
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

.bg-card-feature {
  background: linear-gradient(0deg, rgba(2, 4, 32, 0.60) 0%, rgba(2, 4, 32, 0.60) 100%), linear-gradient(180deg, #1E293B 0%, #0F172A 33.92%);
}

.bg-cta {
  background: linear-gradient(180deg, #1E293B 0%, #0F172A 33.92%);
}
</style>
