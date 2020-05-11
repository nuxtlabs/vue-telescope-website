import 'dotenv/config'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
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
    API_HASURA_URL: process.env.API_HASURA_URL,
    // TODO: remove before production
    HASURA_ADMIN_SECRET_KEY: process.env.HASURA_ADMIN_SECRET_KEY
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/hasura.js', '@/plugins/infinite-loading.client.js'],
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
  http: {
    browserBaseURL: '/'
  },
  // For TailwindUI
  webfontloader: {
    google: {
      families: ['Inter']
    }
  },
  purgeCSS: {
    whitelistPatterns: [/[\w-/.:]+(?<!:)/g]
  },
  build: {
    postcss: {
      preset: {
        features: {
          // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
          'focus-within-pseudo-class': false
        }
      }
    }
  }
}
