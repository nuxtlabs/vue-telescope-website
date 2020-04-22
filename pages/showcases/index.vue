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
              v-model="q"
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
          class="grid gap-8 mx-auto sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
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
              v-for="showcase in list"
              :key="showcase.id"
              :data="showcase"
            />
          </template>
        </div>
        <client-only>
          <infinite-loading
            :identifier="infiniteId"
            @infinite="loadMore"
          ></infinite-loading>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { ContentLoader } from 'vue-content-loader'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import _debounce from 'lodash.debounce'
import showcasePreviewItem from '@/components/ShowcasePreviewItem'
import filterCheckboxes from '@/components/FilterCheckboxes'

const QUERY_ALL_SHOWCASES = gql`
  query($limit: Int, $offset: Int) {
    showcases(limit: $limit, offset: $offset) {
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
  query($limit: Int, $offset: Int, $frameworks: [String!], $uis: [String!]) {
    showcases(
      limit: $limit
      offset: $offset
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
const QUERY_SEARCH_SHOWCASES = gql`
  query($limit: Int, $offset: Int, $q: String!) {
    showcases(
      limit: $limit
      offset: $offset
      where: {
        _or: [
          { domain: { _ilike: $q } }
          { hostname: { _ilike: $q } }
          { slug: { _ilike: $q } }
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
    InfiniteLoading,
    showcasePreviewItem,
    ContentLoader,
    filterCheckboxes
  },
  async fetch() {
    const { data } = await this.$hasura({
      query: print(QUERY_ALL_SHOWCASES),
      variables: {
        limit: this.limit,
        offset: this.offset
      }
    })

    this.$nuxt.context.store.dispatch(
      'setShowcases',
      data ? data.showcases : []
    )
  },
  data() {
    return {
      infiniteId: +new Date(),
      limit: 12,
      offset: null,
      results: [],
      q: '',
      checkedFrameworks: [],
      checkedUis: []
    }
  },
  computed: {
    showcases() {
      return this.$store.getters.showcases
    },
    list() {
      return [...this.showcases, ...this.results]
    }
  },
  watch: {
    q() {
      this.debouncedSearch()
    }
  },
  created() {
    this.debouncedSearch = _debounce(this.search, 500)
  },
  methods: {
    async loadMore($state) {
      let query
      const variables = {
        limit: this.limit,
        offset: this.offset || this.limit
      }
      const hasChecks = this.checkedFrameworks.length || this.checkedUis.length

      if (this.q.trim() !== '') {
        query = QUERY_SEARCH_SHOWCASES
        variables.q = this.q
      } else if (hasChecks) {
        query = QUERY_FILTERED_SHOWCASES
        variables.frameworks = this.checkedFrameworks
        variables.uis = this.checkedUis
      } else {
        query = QUERY_ALL_SHOWCASES
      }

      await this.$hasura({
        query: print(query),
        variables
      }).then(({ data }) => {
        if (data.showcases.length) {
          this.offset += this.limit
          this.results.push(...data.showcases)
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    resetInfinite() {
      this.limit = 12
      this.offset = 0
      this.results = []
      this.infiniteId += 1
    },
    async handleCheckedFrameworks(frameworks) {
      this.resetInfinite()
      this.checkedFrameworks = frameworks
      await this.filter()
    },
    async handlecheckedUis(uis) {
      this.resetInfinite()
      this.checkedUis = uis
      await this.filter()
    },
    async filter() {
      this.$fetchState.pending = true
      let query
      const variables = {
        limit: this.limit,
        offset: this.offset
      }
      if (this.checkedFrameworks.length || this.checkedUis.length) {
        query = QUERY_FILTERED_SHOWCASES
        variables.frameworks = this.checkedFrameworks
        variables.uis = this.checkedUis
      } else {
        query = QUERY_ALL_SHOWCASES
      }
      const { data } = await this.$hasura({
        query: print(query),
        variables
      })

      this.$store.dispatch('setShowcases', data ? data.showcases : [])
      this.$fetchState.pending = false
    },
    async search() {
      this.$fetchState.pending = true
      const { data } = await this.$hasura({
        query: print(QUERY_SEARCH_SHOWCASES),
        variables: {
          q: `%${this.q}%`,
          limit: this.limit,
          offset: this.offset
        }
      })
      this.$store.dispatch('setShowcases', data ? data.showcases : [])
      this.$fetchState.pending = false
    }
  }
}
</script>

<style></style>
