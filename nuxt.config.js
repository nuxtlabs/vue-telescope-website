import 'dotenv/config'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Vue Telemetry | Discover websites made with Vue.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'With Vue Telemetry, reveal the Vue technologies used on any website'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
  ** Public env
  */
  env: {
    ICONS_URL: 'https://nuxt-company.github.io/vue-telemetry-analyzer/',
    API_HASURA_URL: process.env.API_HASURA_URL,
    // TODO: remove before production
    HASURA_ADMIN_SECRET_KEY: process.env.HASURA_ADMIN_SECRET_KEY
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/hasura.js',
    '@/plugins/infinite-loading.client.js',
    '@/plugins/redirect.client.js',
    '@/plugins/click-outside.client.js'
  ],
  /*
  ** generate config
  */
  generate: {
    fallback: '404.html'
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
    // Doc: https://github.com/Developmint/nuxt-webfontloader
    'nuxt-webfontloader'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxt/http'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  components: true,
  http: {
    browserBaseURL: '/'
  },
  // For TailwindUI
  webfontloader: {
    google: {
      families: ['Inter']
    }
  }
}
