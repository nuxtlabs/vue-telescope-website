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
    script: [
      process.env.NODE_ENV === 'production' ? { src: 'https://cdn.usefathom.com/script.js', spa: 'auto', site: 'RLHRHRXN', defer: true } : {}
    ],
    bodyAttrs: {
      class: [
        'font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body'
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
  router: {
    prefetchPayloads: false
  },
  generate: {
    cache: {
      ignore: ['netlify.toml', 'jsconfig.json']
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
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/api/analyze': {
      target: 'http://localhost:8888'
    }
  }
}
