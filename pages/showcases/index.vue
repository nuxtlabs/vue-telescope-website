<template>
  <div>
    <div class="flex flex-col sm:flex-row border-t border-gray-300">
      <div
        class="hidden sm:block p-2 w-60 overflow-auto sticky top-0 border-r border-gray-300"
        style="height: 37rem;"
      >
        <div class="w-full">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        <form class="mt-4">
          <filterCheckboxes
            type="frameworks"
            @checkedItems="handleCheckedFrameworks"
          />
          <filterCheckboxes
            type="uis"
            class="mt-4"
            @checkedItems="handlecheckedUis"
          />
        </form>
      </div>
      <div class="p-10 sm:flex-1" style="min-height: 1000px;">
        <div
          class="grid gap-10 max-w-lg mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none"
        >
          <template v-if="$fetchState.pending">
            <content-loader
              v-for="n in 12"
              :key="n"
              width="346"
              height="245"
              :speed="2"
            >
              <rect x="0" y="0" rx="4" ry="4" width="346" height="192" />
              <rect x="0" y="197" rx="4" ry="4" width="103" height="16" />
              <rect x="0" y="216" rx="4" ry="4" width="68" height="16" />
            </content-loader>
          </template>
          <template v-else>
            <showcasePreviewItem
              v-for="showcase in showcases"
              :key="showcase.id"
              :data="showcase"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import showcasePreviewItem from '@/components/ShowcasePreviewItem'
import filterCheckboxes from '@/components/FilterCheckboxes'

const QUERY_ALL_SHOWCASES = gql`
  query {
    showcases {
      slug
      url
      hostname
      domain
      screenshot_url
      vue_version
    }
  }
`
const QUERY_FILTERED_SHOWCASES = gql`
  query($frameworks: [String!], $uis: [String!]) {
    showcases(
      where: {
        _or: [
          { framework: { slug: { _in: $frameworks } } }
          { ui: { slug: { _in: $uis } } }
        ]
      }
    ) {
      slug
      url
      hostname
      domain
      screenshot_url
      vue_version
    }
  }
`
export default {
  components: {
    showcasePreviewItem,
    ContentLoader,
    filterCheckboxes
  },
  async fetch() {
    const { data } = await this.$hasura({
      query: print(QUERY_ALL_SHOWCASES)
    })

    this.$nuxt.context.store.dispatch(
      'setShowcases',
      data ? data.showcases : []
    )
  },
  data() {
    return {
      checkedFrameworks: [],
      checkedUis: []
    }
  },
  computed: {
    showcases() {
      return this.$store.getters.showcases
    }
  },
  methods: {
    async handleCheckedFrameworks(frameworks) {
      this.checkedFrameworks = frameworks
      await this.filter()
    },
    async handlecheckedUis(uis) {
      this.checkedUis = uis
      await this.filter()
    },
    async filter() {
      let query
      let variables
      if (this.checkedFrameworks.length || this.checkedUis.length) {
        query = QUERY_FILTERED_SHOWCASES
        variables = {
          frameworks: this.checkedFrameworks,
          uis: this.checkedUis
        }
      } else {
        query = QUERY_ALL_SHOWCASES
      }
      const { data } = await this.$hasura({
        query: print(query),
        variables
      })

      this.$store.dispatch('setShowcases', data ? data.showcases : [])
    }
  }
}
</script>

<style></style>
