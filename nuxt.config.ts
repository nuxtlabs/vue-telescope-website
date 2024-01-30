export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: '@nuxt/ui-pro',
  modules: [
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
    '@nuxtjs/plausible',
    '@vueuse/nuxt'
  ],

  ui: {
    icons: ['heroicons', 'simple-icons', 'ph']
  },

  colorMode: {
    preference: 'dark'
  },

  fontMetrics: {
    fonts: ['DM Sans']
  },

  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [400, 500, 600, 700]
    }
  },

  typescript: {
    strict: false
  },
  // publicRuntimeConfig: {
  //   baseUrl: process.env.VERCEL
  //     ? `https://${process.env.VERCEL_URL}`
  //     : 'http://localhost:3000',
  //   strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
  //   serviceURL: process.env.SERVICE_URL || 'http://localhost:3001',
  //   iconsURL: process.env.ICONS_URL,
  //   firefoxStoreUrl:
  //     'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/',
  //   googleStoreUrl:
  //     'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd',
  //   edgeStoreUrl: 'https://microsoftedge.microsoft.com/addons/detail/vue-telescope/icgcillpgelpleniodgkmohgdmeogodl',
  //   plausible: {
  //     domain: 'vuetelescope.com'
  //   }
  // },
})
