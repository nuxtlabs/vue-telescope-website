import { defineNuxtConfig } from 'nuxt'

console.log('process.env', process.env.STRAPI_URL)

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/strapi',
    'nuxt-svgo'
  ],
  strapi: {
    prefix: '',
    version: 'v3',
    cookie: {
      path: '/'
    }
  },
  publicRuntimeConfig: {
    baseUrl: (process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL) || 'http://localhost:3000',
    strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
    serviceURL: process.env.SERVICE_URL || 'http://localhost:3001',
    iconsURL: process.env.ICONS_URL,
    firefoxStoreUrl:
      'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/',
    googleStoreUrl:
      'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd'
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
  ]
})
