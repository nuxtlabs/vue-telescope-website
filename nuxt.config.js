import 'dotenv/config'

export default {
  mode: 'universal',
  target: 'static',
  // Activate components auto discovery
  components: true,
  // Disable loading bar
  loading: { color: '#fff' },
  head: {
    title: 'Vue Telemetry | Discover websites made with Vue.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'With Vue Telemetry, reveal the Vue technologies used on any website'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: [
        'font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900'
      ]
    }
  },
  plugins: [
    '~/plugins/init',
    '~/plugins/gsap.client',
    '~/plugins/vue-placeholders',
    '~/plugins/detect-client.client',
    '~/plugins/twitter-like',
    '~/plugins/intersection-observer.client',
    '~/plugins/vue-observe-visibility.client'
  ],
  generate: {
    cache: {
      ignore: [
        'netlify.toml',
        'jsconfig.json'
      ]
    },
    fallback: '404.html' // For Netlify
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // Doc: https://strapi.nuxtjs.org
    '@nuxtjs/strapi',
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // Doc: https://github.com/pimlie/nuxt-matomo
    ['nuxt-matomo', { matomoUrl: '//vuetelemetry.matomo.cloud/', siteId: 1 }]
  ],
  proxy: {
    '/api/analyze': {
      target: 'http://localhost:8888'
    }
  }
}
