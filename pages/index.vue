<template>
  <div>
    <section id="hero" class="relative">
      <div
        class="max-w-6xl mx-auto h-full px-4 pt-20 pb-10 sm:px-6 lg:px-8 lg:pt-0"
      >
        <div class="flex flex-col md:flex-row">
          <div class="flex-1 flex flex-col justify-center">
            <h1 class="text-5xl font-semibold leading-none pb-6">
              Discover websites <br />made with
              <span class="text-emerald">Vue.js</span>
            </h1>
            <p class="text-xl pb-10">
              Explore the Web with Vue Telemetry and reveal the Vue technologies
              used on any website.
            </p>
            <WebsiteSubmit />
          </div>
          <div class="flex-1 flex items-center justify-center">
            <HomeIllustration class="w-96 md:w-full" />
          </div>
        </div>
      </div>
    </section>

    <section id="welcome" class="w-full h-screen bg-emerald"></section>

    <section id="featured" class="relative bg-black">
      <div class="max-w-6xl mx-auto h-full px-4 pb-10 sm:px-6 lg:px-8 lg:pt-0">
        <h5
          class="mb-8 text-2xl leading-8 font-bold tracking-tighter text-nuxt-gray sm:leading-10"
        >
          Explore over <span class="text-emerald">{{ count }}</span> websites
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
            class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-emerald hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
          >
            Explore
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import HomeIllustration from '@/assets/illustrations/home.svg?inline'

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
    HomeIllustration
  },
  async asyncData({ app }) {
    const { data } = await app.$hasura({
      query: print(QUERY)
    })

    return {
      count: data.showcases_aggregate.aggregate.count,
      featured: data.featured
    }
  },
  methods: {
    handleClick(slug) {
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
