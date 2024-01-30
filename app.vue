<script setup lang="ts">
useServerSeoMeta({
  ogSiteName: 'NuxtLabs',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: 'nuxtlabs'
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: 'bg-slate-950'
  }
})
</script>

<template>
  <header class="flex items-center justify-center h-16">
    <Logo />
  </header>

  <NuxtPage />

  <UFooter class="border-t-[0.5px] border-gray-800">
    <template #left>
      <div class="text-sm text-center text-slate-400">
        <span target="_blank" class="text-gray-200">Published under <a href="https://github.com/nuxtlabs/vue-telescope-extensions" class="hover:underline underline-offset-[3px] font-semibold">MIT license</a>.</span>
      </div>
    </template>
    <template #right>
      <UButton
        aria-label="Nuxt.com"
        to="https://www.nuxt.com"
        target="_blank"
        icon="i-simple-icons-nuxtdotjs"
        variant="ghost"
        color="gray"
      />
      <UButton
        aria-label="NuxtLabs on X"
        to="https://x.com/nuxtlabs"
        target="_blank"
        icon="i-simple-icons-x"
        variant="ghost"
        color="gray"
        size="xs"
      />
      <UButton
        aria-label="NuxtLabs on GitHub"
        to="https://github.com/nuxtlabs"
        target="_blank"
        icon="i-simple-icons-github"
        variant="ghost"
        color="gray"
      />
    </template>
  </UFooter>
</template>
