import 'dotenv/config'
import { favicons } from './meta-tags/icons'
import msApple from './meta-tags/ms-apple'

export default {
  mode: 'universal',
  target: 'static',
  // Activate components auto discovery
  components: true,
  // Disable loading bar
  loading: { color: '#0BDCA0' },
  head: {
    title: 'Vue Telemetry | Discover websites made with Vue.js',
    meta: [
      // { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Reveal the Vue plugins and technology stack powering any website'
      },
      ...msApple({ brand: 'Vue Telemetry' })
    ],
    link: [...favicons],
    script: [
      process.env.NODE_ENV === 'production'
        ? {
            src: 'https://cdn.usefathom.com/script.js',
            spa: 'auto',
            site: 'RLHRHRXN',
            defer: true
          }
        : {},
      process.env.NODE_ENV === 'production'
        ? {
            src: 'https://feedback.fish/ff.js?pid=dd580ca404b5b7',
            defer: true
          }
        : {}
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
    // '@nuxtjs/pwa'
  ],
  // pwa: {
  //   manifest: {
  //     name: 'Vue Telemetry',
  //     short_name: 'VT',
  //     description: 'Discover websites made with Vue.js',
  //     background_color: '#ffffff',
  //     theme_color: '#0BDCA0'
  //   },
  //   // meta: false,
  //   // meta: {
  //   //   ogHost: 'https://vuetelemetry.com',
  //   //   ogImage: {
  //   //     path: '/og-image.jpg'
  //   //   },
  //   //   twitterCard: 'summary_large_image',
  //   //   twitterSite: '@vuetelemetry'
  //   // },
  //   icon: true
  // },
  proxy: {
    '/api/analyze': {
      target: 'http://localhost:8888'
    }
  }
}
