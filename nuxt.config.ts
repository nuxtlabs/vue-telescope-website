import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: [
          'font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body'
        ]
      }
    }
  },
  modules: ['@nuxt/content'],
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/strapi'],
  strapi: {
    prefix: ''
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  },
  publicRuntimeConfig: {
    strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
    serviceURL: process.env.SERVICE_URL || 'http://localhost:3001',
    iconsURL: process.env.ICONS_URL,
    firefoxStoreUrl:
      'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/',
    googleStoreUrl:
      'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd'
  },
  vite: {
    plugins: [
      svgLoader({
        svgo: false
      })
    ]
  },
  components: [
    {
      path: '~/components',
      global: true
    }
  ]
})
