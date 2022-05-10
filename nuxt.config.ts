import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        // TODO: does not work
        class: [
          'font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body'
        ]
      }
    }
  },
  buildModules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: 'tailwind.config.ts'
  }
})
