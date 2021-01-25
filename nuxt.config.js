import frontMatter from './utils/front-matter'

export default {
  ssr: true,
  target: 'static',
  // Activate components auto discovery
  components: true,
  // SPA Fallback
  // loadingIndicator: {
  //   name: 'cube-grid',
  //   color: '#0BDCA0',
  //   background: 'white'
  // },
  // Disable loading bar
  loading: false,
  // Meta Tags
  head: {
    ...frontMatter({
      path: '',
      noindex: true // fallback noindex for SPA fallback
    }),
    bodyAttrs: {
      class: [
        'font-body antialiased overflow-x-hidden overflow-y-scroll text-grey-900 min-w-body'
      ]
    }
  },
  plugins: [
    '~/plugins/init',
    '~/plugins/fetch-collections',
    '~/plugins/changelog',
    '~/plugins/gsap.client',
    '~/plugins/vue-placeholders',
    '~/plugins/detect-client.client',
    '~/plugins/direct-hit',
    '~/plugins/vue-portal',
    '~/plugins/intersection-observer.client',
    '~/plugins/vue-observe-visibility.client',
    '~/plugins/tour',
    '~/plugins/inject',
    '~/plugins/directives.js'
    // '~/plugins/password.client'
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
  modules: [
    '@nuxt/content',
    // Doc: https://strapi.nuxtjs.org
    '@nuxtjs/strapi',
    'nuxt-mq'
  ],
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/svg-module
    '@nuxtjs/svg',
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // Doc: https://pwa.nuxtjs.org
    '@nuxtjs/pwa',
    'vue-plausible'
  ],
  pwa: {
    manifest: {
      name: 'Vue Telescope',
      short_name: 'VT',
      description: 'Discover websites made with Vue.js',
      background_color: '#ffffff',
      theme_color: '#0BDCA0'
    },
    meta: false,
    icon: true
  },
  proxy: {
    // END BETA
    '/api/analyze': {
      target: 'http://localhost:8888'
    }
  },
  plausible: {
    // https://github.com/moritzsternemann/vue-plausible#configuration
    domain: 'vuetelescope.com'
  },
  publicRuntimeConfig: {
    strapiURL: process.env.STRAPI_URL || 'http://localhost:1337',
    serviceURL: process.env.SERVICE_URL || 'http://localhost:3001',
    iconsURL: process.env.ICONS_URL
  }
}
