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
    <NuxtPage />
</template>
