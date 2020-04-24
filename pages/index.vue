<template>
  <div class="max-w-screen-xl mx-auto">
    <div
      class="absolute top-0 left-0 right-0"
      :style="{ backgroundImage: `url('img/background.png')` }"
      style="background-repeat: no-repeat; height: 855px; z-index: -9999;"
    ></div>
    <section
      id="hero"
      class="max-w-7xl mx-auto h-full px-4 pt-20 pb-10 sm:px-6 lg:px-8 lg:pt-0"
    >
      <div class="flex flex-col md:flex-row">
        <div class="flex-1 flex flex-col justify-center lg:ml-10">
          <h1 class="text-4xl font-extrabold text-white">
            Discover websites
            <br />made with Vue.js
          </h1>
          <p class="mt-2 mb-6 text-white text-lg">
            With Vue Telemetry, reveal the Vue technologies
            <br />used on any website.
          </p>
          <div class="text-center sm:text-left">
            <nuxt-link
              to="/showcases"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-semibold rounded-full shadow-md uppercase text-green-400 bg-white hover:shadow-xl focus:outline-none focus:border-nuxt focus:shadow-outline-nuxt active:bg-nuxt-200 transition ease-in-out duration-150"
              >browse showcase</nuxt-link
            >
          </div>
        </div>
        <div class="flex-1 flex items-center justify-center">
          <img src="/img/hero.svg" alt="hero" class="w-96 md:w-auto" />
        </div>
      </div>
    </section>
    <section id="technos" class="px-4 sm:px-6 pt-20 pb-12 sm:pt-40 lg:px-8">
      <div class="">
        <h5
          class="mt-8 mb-10 text-center text-3xl leading-8 font-bold tracking-tighter text-gray-700 sm:text-4xl sm:leading-10"
        >
          <span class="text-green-400">{{ count }}</span> sites analyzed with
          <span class="text-green-400">Vue Telemetry</span>
        </h5>
        <div class="mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-4 lg:mt-8">
          <div
            v-for="(techno, id) in technos"
            :key="id"
            class="techno__wrapper col-span-1 flex justify-center py-8 px-8 bg-gray-50"
          >
            <img
              class="techno__img max-h-12"
              :src="techno.logoPath"
              :alt="techno.alt"
            />
          </div>
        </div>
      </div>
    </section>
    <section id="what" class="py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h5
        class="mb-10 text-3xl leading-8 font-bold tracking-tighter text-gray-700 sm:text-4xl sm:leading-10"
      >
        What’s
        <span class="text-green-400">telemetry ?</span>
      </h5>
      <p class="text-gray-500">
        Telemetry is a technique used to obtain information from an application
        installed on your computer. It aims to provide feedback and collect data
        for statistical purposes.
      </p>
    </section>
    <section id="why" class="py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h5
        class="text-center mb-16 text-3xl leading-8 font-bold tracking-tighter text-gray-700 sm:text-4xl sm:leading-10"
      >
        <span class="text-green-400">Why use</span> Vue Telemetry ?
      </h5>
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div class="flex flex-row sm:flex-col">
          <div
            class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-green-400 text-white mr-5 sm:mr-0"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </div>
          <div class="sm:mt-5">
            <h5 class="text-lg leading-6 font-medium text-gray-700">
              Free
            </h5>
            <p class="mt-2 text-base leading-6 text-gray-500">
              The application and the showcase is available online and access is
              free for everyone.
            </p>
          </div>
        </div>
        <div class="flex flex-row sm:flex-col mt-10 lg:mt-0">
          <div
            class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-green-400 text-white mr-5 sm:mr-0"
          >
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 2C8.71475 2 5.76681 3.43895 3.74975 5.72426C3.38429 6.13833 2.75235 6.17773 2.33828 5.81227C1.92421 5.4468 1.88481 4.81486 2.25027 4.40079C4.63088 1.70358 8.11712 0 12 0C15.8829 0 19.3691 1.70358 21.7498 4.40079C22.1152 4.81486 22.0758 5.4468 21.6617 5.81227C21.2477 6.17773 20.6157 6.13833 20.2503 5.72426C18.2332 3.43895 15.2853 2 12 2ZM12 6C8.13402 6 5.00001 9.13401 5.00001 13C5.00001 16.6378 6.49288 19.9251 8.90195 22.2858C9.29641 22.6723 9.30283 23.3054 8.91629 23.6999C8.52974 24.0944 7.89661 24.1008 7.50215 23.7142C4.72501 20.9929 3.00001 17.197 3.00001 13C3.00001 8.02944 7.02945 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6ZM15.1344 5.56953C15.4109 5.09147 16.0227 4.92811 16.5007 5.20465C19.1882 6.75928 21 9.66747 21 13C21 14.6569 19.6569 16 18 16C16.3432 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C11.2385 10 10.5454 10.2824 10.0159 10.7497C9.60185 11.1152 8.96991 11.0758 8.60445 10.6617C8.23898 10.2477 8.27838 9.61573 8.69245 9.25026C9.57327 8.47284 10.7326 8 12 8C14.7614 8 17 10.2386 17 13C17 13.5523 17.4477 14 18 14C18.5523 14 19 13.5523 19 13C19 10.4103 17.5942 8.14771 15.4993 6.93586C15.0212 6.65932 14.8579 6.04759 15.1344 5.56953ZM12 12C12.5523 12 13 12.4477 13 13C13 15.7614 15.2386 18 18 18C18.2851 18 18.5638 17.9762 18.8346 17.9308C19.3792 17.8394 19.8948 18.2069 19.9862 18.7516C20.0776 19.2963 19.7101 19.8119 19.1655 19.9033C18.7858 19.967 18.3964 20 18 20C14.134 20 11 16.866 11 13C11 12.4477 11.4477 12 12 12ZM7.95059 13.0049C8.50017 12.9503 8.98993 13.3516 9.04449 13.9012C9.46649 18.1515 12.8485 21.5335 17.0988 21.9555C17.6484 22.0101 18.0497 22.4998 17.9951 23.0494C17.9406 23.599 17.4508 24.0003 16.9012 23.9457C11.7026 23.4296 7.57043 19.2974 7.05428 14.0988C6.99971 13.5492 7.401 13.0595 7.95059 13.0049Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="sm:mt-5">
            <h5 class="text-lg leading-6 font-medium text-gray-700">
              Anonymous
            </h5>
            <p class="mt-2 text-base leading-6 text-gray-500">
              Your personal data (name, address, location) remains confidential
              and will not be monetized.
            </p>
          </div>
        </div>
        <div class="flex flex-row sm:flex-col mt-10 lg:mt-0">
          <div
            class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-green-400 text-white mr-5 sm:mr-0"
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
              <circle cx="18" cy="18" r="3"></circle>
              <circle cx="6" cy="6" r="3"></circle>
              <path d="M6 21V9a9 9 0 0 0 9 9"></path>
            </svg>
          </div>
          <div class="sm:mt-5">
            <h5 class="text-lg leading-6 font-medium text-gray-700">
              Contribute
            </h5>
            <p class="mt-2 text-base leading-6 text-gray-500">
              The extension is open source, which means that anyone can add new
              technologies or respond to issues.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="how" class="py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h5
        class="mb-8 text-center text-3xl font-bold tracking-tighter text-gray-700 sm:text-4xl sm:text-left"
      >
        How to
        <span class="text-green-400">install it ?</span>
      </h5>
      <p class="mb-8 text-gray-500">
        Vue Telemetry is available on Google Chrome and Mozilla Firefox. Its
        installation is quick and simple.
        <br />You can also works locally and offline. <br />Click on the link
        for download app and choose your browser.
      </p>
      <div class="text-center sm:text-left">
        <nuxt-link
          to="/download"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-green-400 hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
          >Get browser extension</nuxt-link
        >
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'

const QUERY_COUNT_SHOWCASES = gql`
  query {
    showcases_aggregate {
      aggregate {
        count
      }
    }
  }
`

export default {
  async asyncData({ app }) {
    const { data } = await app.$hasura({
      query: print(QUERY_COUNT_SHOWCASES)
    })

    return {
      count: data.showcases_aggregate.aggregate.count
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
