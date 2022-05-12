import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
      serviceURL: process.env.SERVICE_URL || 'http://localhost:3001',
      iconsURL: process.env.ICONS_URL || '',
      firefoxStoreUrl: 'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/',
      googleStoreUrl: 'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd'
    }
  }
})
