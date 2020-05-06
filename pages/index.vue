<template>
  <div>
    <section id="hero" class="relative">
      <bgGradient klass="hero" />
      <div
        class="max-w-6xl mx-auto h-full px-4 pt-20 pb-10 sm:px-6 lg:px-8 lg:pt-0"
      >
        <div class="flex flex-col md:flex-row">
          <div class="flex-1 flex flex-col justify-center">
            <h1
              class="self-center sm:self-start text-center sm:text-left text-5xl font-bold text-nuxt-gray leading-none"
            >
              Discover websites
              <br />made with Vue.js
            </h1>
            <p
              class="self-center sm:self-start text-center sm:text-left mt-2 mb-6 text-gray-700 text-base"
            >
              With Vue Telemetry, reveal the Vue technologies
              <br />used on any website.
            </p>
            <div class="flex items-center justify-center sm:justify-start">
              <nuxt-link
                to="/showcases"
                class="mr-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded shadow text-nuxt-lightgreen bg-white hover:shadow-lg focus:outline-none focus:border-nuxt focus:shadow-outline-nuxt active:bg-nuxt-200 transition ease-in-out duration-150"
                >Browse showcase</nuxt-link
              >
              <nuxt-link
                to="/scan"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded shadow text-white bg-nuxt-lightgreen hover:shadow-lg focus:outline-none focus:border-nuxt focus:shadow-outline-nuxt active:bg-nuxt-200 transition ease-in-out duration-150"
                >Submit your URL</nuxt-link
              >
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center">
            <img src="/img/hero.svg" alt="hero" class="w-96 md:w-auto" />
          </div>
        </div>
      </div>
    </section>
    <section id="technos" class="relative">
      <div class="max-w-6xl mx-auto h-full my-48 pb-10 sm:px-6 lg:px-8 lg:pt-0">
        <h5
          class="mt-8 mb-10 text-center text-3xl leading-8 font-bold tracking-tighter text-nuxt-gray sm:leading-10"
        >
          Over
          <span class="text-nuxt-lightgreen">{{ count * 3245 }}</span> sites
          analyzed with
          <span class="text-nuxt-lightgreen">Vue Telemetry</span>
        </h5>
      </div>
    </section>
    <section id="featured" class="relative">
      <bgGradient klass="featured" />
      <div class="max-w-6xl mx-auto h-full px-4 pb-10 sm:px-6 lg:px-8 lg:pt-0">
        <h5
          class="mb-8 text-xl leading-8 font-bold tracking-tighter text-nuxt-lightgreen sm:leading-10"
        >
          <span class="text-nuxt-gray">Featured</span> Showcases
        </h5>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <showcaseFeaturedItem
            v-for="item in featured"
            :key="item.id"
            :data="item"
          />
        </div>
        <div class="mt-16 text-center">
          <nuxt-link
            to="/showcases"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
            >View All</nuxt-link
          >
        </div>
      </div>
    </section>
    <section id="explain" class="relative mt-36 sm:mt-72 mb-28">
      <bgGradient klass="explain" />
      <div class="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-16 mb-14">
          <div class="flex-shrink-0 flex items-center justify-center">
            <h5
              class="mb-6 sm:mb-0 text-4xl leading-8 font-bold tracking-tighter text-nuxt-gray sm:leading-10"
            >
              What’s
              <span class="text-nuxt-lightgreen">telemetry ?</span>
            </h5>
          </div>
          <p class="text-gray-500">
            Telemetry is a technique used to obtain information from an
            application installed on your computer. It aims to provide feedback
            and collect data for statistical purposes.
          </p>
        </div>
        <div
          class="flex flex-col-reverse sm:grid sm:grid-cols-2 sm:gap-16 mb-14"
        >
          <div class="flex items-center">
            <p class="text-gray-500">
              We've developed Vue Telemetry to track down websites built with
              VueJS and its ecosystem. The Vue Telemetry browser extension is
              able to detect Vue on each and every url you visit.
            </p>
          </div>
          <div class="mb-8 sm:mb-0 flex items-center justify-center">
            <img src="/img/ecosystem.svg" alt="vue telemetry ecosystem" />
          </div>
        </div>
        <div
          class="flex flex-col-reverse sm:grid sm:grid-cols-2 sm:gap-16 mb-14"
        >
          <div class>
            <div class="flex flex-row mb-4">
              <div
                class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-nuxt-lightgreen"
              >
                <svg
                  class="h-6 w-6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-base leading-6 text-gray-500">
                  The application and the showcase is available online and
                  access is
                  <span class="text-nuxt-lightgreen font-semibold">free</span>
                  for everyone.
                </p>
              </div>
            </div>
            <div class="flex flex-row mb-4">
              <div
                class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
              >
                <svg
                  class="h-6 w-6 fill-current text-nuxt-lightgreen"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C8.71475 2 5.76681 3.43895 3.74975 5.72426C3.38429 6.13833 2.75235 6.17773 2.33828 5.81227C1.92421 5.4468 1.88481 4.81486 2.25027 4.40079C4.63088 1.70358 8.11712 0 12 0C15.8829 0 19.3691 1.70358 21.7498 4.40079C22.1152 4.81486 22.0758 5.4468 21.6617 5.81227C21.2477 6.17773 20.6157 6.13833 20.2503 5.72426C18.2332 3.43895 15.2853 2 12 2ZM12 6C8.13402 6 5.00001 9.13401 5.00001 13C5.00001 16.6378 6.49288 19.9251 8.90195 22.2858C9.29641 22.6723 9.30283 23.3054 8.91629 23.6999C8.52974 24.0944 7.89661 24.1008 7.50215 23.7142C4.72501 20.9929 3.00001 17.197 3.00001 13C3.00001 8.02944 7.02945 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM15.1344 5.56953C15.4109 5.09147 16.0227 4.92811 16.5007 5.20465C19.1882 6.75928 21 9.66747 21 13C21 14.6569 19.6569 16 18 16C16.3432 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C11.2385 10 10.5454 10.2824 10.0159 10.7497C9.60185 11.1152 8.96991 11.0758 8.60445 10.6617C8.23898 10.2477 8.27838 9.61573 8.69245 9.25026C9.57327 8.47284 10.7326 8 12 8C14.7614 8 17 10.2386 17 13C17 13.5523 17.4477 14 18 14C18.5523 14 19 13.5523 19 13C19 10.4103 17.5942 8.14771 15.4993 6.93586C15.0212 6.65932 14.8579 6.04759 15.1344 5.56953ZM12 12C12.5523 12 13 12.4477 13 13C13 15.7614 15.2386 18 18 18C18.2851 18 18.5638 17.9762 18.8346 17.9308C19.3792 17.8394 19.8948 18.2069 19.9862 18.7516C20.0776 19.2963 19.7101 19.8119 19.1655 19.9033C18.7858 19.967 18.3964 20 18 20C14.134 20 11 16.866 11 13C11 12.4477 11.4477 12 12 12ZM7.95059 13.0049C8.50017 12.9503 8.98993 13.3516 9.04449 13.9012C9.46649 18.1515 12.8485 21.5335 17.0988 21.9555C17.6484 22.0101 18.0497 22.4998 17.9951 23.0494C17.9406 23.599 17.4508 24.0003 16.9012 23.9457C11.7026 23.4296 7.57043 19.2974 7.05428 14.0988C6.99971 13.5492 7.401 13.0595 7.95059 13.0049Z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-base leading-6 text-gray-500">
                  Your personal data (name, address, location) remains
                  <span class="text-nuxt-lightgreen font-semibold"
                    >confidential</span
                  >
                  and will not be monetized.
                </p>
              </div>
            </div>
            <div class="flex flex-row">
              <div
                class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-nuxt-lightgreen"
              >
                <svg
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M6 21V9a9 9 0 0 0 9 9" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-base leading-6 text-gray-500">
                  The extension is
                  <span class="text-nuxt-lightgreen font-semibold"
                    >open source</span
                  >, which means that anyone can add new technologies or respond
                  to issues.
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <h5
              class="mb-8 sm:mb-0 text-4xl leading-8 font-bold tracking-tighter text-nuxt-gray"
            >
              <span class="text-nuxt-lightgreen">Why use</span> Vue Telemetry ?
            </h5>
          </div>
        </div>
        <div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-16">
          <div class="mb-6 sm:mb-0">
            <h5
              class="mb-6 text-center text-4xl font-bold tracking-tighter text-nuxt-gray"
            >
              How to
              <span class="text-nuxt-lightgreen">install it ?</span>
            </h5>
            <p class="mb-8 text-gray-500">
              Vue Telemetry is available on Google Chrome and Mozilla Firefox.
              Its installation is quick and simple.
              <br />You can also works locally and offline. <br />Click on the
              link for download app and choose your browser.
            </p>
            <div class="text-center">
              <nuxt-link
                to="/download"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
                >Get browser extension</nuxt-link
              >
            </div>
          </div>
          <div class="hidden sm:block">
            <img src="/img/extension.svg" alt="vue telemetry extension" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import showcaseFeaturedItem from '@/components/ShowcaseFeaturedItem'
import bgGradient from '@/components/BgGradient'

const QUERY = gql`
  query {
    showcases_aggregate {
      aggregate {
        count
      }
    }
    showcases(limit: 9) {
      id
      domain
      vue_version
      screenshot_url
    }
  }
`

export default {
  components: {
    showcaseFeaturedItem,
    bgGradient
  },
  async asyncData({ app }) {
    const { data } = await app.$hasura({
      query: print(QUERY)
    })

    return {
      count: data.showcases_aggregate.aggregate.count,
      featured: data.showcases
    }
  },
  data() {
    return {
      technos: [
        {
          logoPath: '/img/vuejs.svg',
          alt: 'VueJS'
        },
        {
          logoPath: '/img/nuxt.svg',
          alt: 'NuxtJS'
        },
        {
          logoPath: '/img/gridsome.svg',
          alt: 'Gridsome'
        },
        {
          logoPath: '/img/vuepress.svg',
          alt: 'Vuepress'
        },
        {
          logoPath: '/img/bootstrap.svg',
          alt: 'Bootstrap'
        },
        {
          logoPath: '/img/vuetify.svg',
          alt: 'Vuetify'
        },
        {
          logoPath: '/img/bulma.svg',
          alt: 'Bulma'
        },
        {
          logoPath: '/img/tailwind.svg',
          alt: 'Tailwind'
        }
      ]
    }
  }
}
</script>

<style>
.techno__img {
  transition: filter ease-in-out 300ms;
  filter: grayscale(1);
  -webkit-filter: grayscale(1);
}
.techno__wrapper:hover .techno__img {
  filter: grayscale(0);
  -webkit-filter: grayscale(0);
}
</style>
