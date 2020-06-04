<template>
  <div>
    <section id="hero" class="relative">
      <BgGradient klass="hero" />
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
              <NuxtLink
                to="/explore"
                class="mr-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded shadow text-nuxt-lightgreen bg-white hover:shadow-lg focus:outline-none focus:border-nuxt focus:shadow-outline-nuxt active:bg-nuxt-200 transition ease-in-out duration-150"
              >
                Explore
              </NuxtLink>
              <NuxtLink
                to="/submit"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded shadow text-white bg-nuxt-lightgreen hover:shadow-lg focus:outline-none focus:border-nuxt focus:shadow-outline-nuxt active:bg-nuxt-200 transition ease-in-out duration-150"
              >
                Submit an URL
              </NuxtLink>
            </div>
          </div>
          <div class="flex-1 flex items-center justify-center">
            <img src="/img/hero.svg" alt="hero" class="w-96 md:w-auto" />
          </div>
        </div>
      </div>
    </section>
    <section id="featured" class="relative">
      <div class="max-w-6xl mx-auto h-full px-4 pb-10 sm:px-6 lg:px-8 lg:pt-0">
        <h5
          class="mb-8 text-2xl leading-8 font-bold tracking-tighter text-nuxt-gray sm:leading-10"
        >
          Explore over <span class="text-nuxt-lightgreen">{{ count }}</span> websites
        </h5>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <ShowcaseFeaturedItem
            v-for="item in featured"
            :key="item.id"
            :data="item"
            @click.native="handleClick(item.slug)"
          />
        </div>
        <div class="mt-16 text-center">
          <NuxtLink
            to="/explore"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
          >
            Explore
          </NuxtLink>
        </div>
      </div>
    </section>
    <section id="explain" class="relative mt-36 sm:mt-72 mb-28">
      <BgGradient klass="explain" />
      <div class="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 mb-14">
          <div class="flex items-center justify-center">
            <h5
              class="mb-6 sm:mb-0 text-4xl leading-8 font-bold tracking-tighter text-nuxt-gray sm:leading-10"
            >
              What’s
              <span class="text-nuxt-lightgreen">Vue Telemetry ?</span>
            </h5>
          </div>
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
                <ScalesIcon class="h-6 w-6" />
              </div>
              <div class="ml-4">
                <p class="text-base leading-6 text-gray-500">
                  The application and the showcase are available online and
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
                <FingerprintIcon class="h-6 w-6 " />
              </div>
              <div class="ml-4">
                <p class="text-base leading-6 text-gray-500">
                  No personal data is collected, only the submitted url is
                  scanned and saved.
                </p>
              </div>
            </div>
            <div class="flex flex-row">
              <div
                class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-nuxt-lightgreen"
              >
                <GitBranchIcon class="h-6 w-6" />
              </div>
              <div class="ml-4">
                <p class="text-base leading-6 text-gray-500">
                  The analyzer is
                  <a href="https://github.com/nuxt-company/vue-telemetry-analyzer" target="_blank" rel="noopener" class="text-nuxt-lightgreen font-semibold">open source</a>, which means that anyone can add new technologies.
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
              Vue Telemetry is also available on Google Chrome and Mozilla Firefox.
              Quickly see when a website uses Vue and reveal the ecosystem used inside with one click.
              <br />Start now and download Vue Telemetry for your favourite browser.
            </p>
            <div class="text-center">
              <NuxtLink
                to="/download"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
              >
                Browser Extensions
              </NuxtLink>
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
import ScalesIcon from '@/assets/icons/scales.svg?inline'
import FingerprintIcon from '@/assets/icons/fingerprint.svg?inline'
import GitBranchIcon from '@/assets/icons/git-branch.svg?inline'

const QUERY = gql`
  query {
    showcases_aggregate {
      aggregate {
        count
      }
    }
    featured(limit: 9) {
      id
      slug
      domain
      vue_version
      screenshot_url
    }
  }
`

export default {
  components: {
    ScalesIcon,
    FingerprintIcon,
    GitBranchIcon
  },
  async asyncData ({ app }) {
    const { data } = await app.$hasura({
      query: print(QUERY)
    })

    return {
      count: data.showcases_aggregate.aggregate.count,
      featured: data.featured
    }
  },
  methods: {
    handleClick (slug) {
      this.$router.push(`/explore?preview=${slug}`)
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
