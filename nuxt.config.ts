import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/strapi',
    'nuxt-svgo',
    'vue-plausible'
  ],
  strapi: {
    prefix: '',
    version: 'v3',
    cookie: {
      path: '/'
    }
  },
  publicRuntimeConfig: {
    baseUrl: process.env.VERCEL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000',
    strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
    serviceURL: process.env.SERVICE_URL || 'http://localhost:3001',
    iconsURL: process.env.ICONS_URL,
    firefoxStoreUrl:
      'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/',
    googleStoreUrl:
      'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd',
    edgeStoreUrl: 'https://microsoftedge.microsoft.com/addons/detail/vue-telescope/icgcillpgelpleniodgkmohgdmeogodl',
    plausible: {
      domain: 'vuetelescope.com'
    }
  },
  svgo: {
    svgo: false
  },
  components: [
    {
      path: '~/components',
      global: true,
      pathPrefix: false
    }
  ],
  experimental: {
    viteNode: true
  }
})
