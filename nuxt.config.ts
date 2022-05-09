import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  }
})
