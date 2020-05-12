<template>
  <div>
    <section id="hero" class>
      <div class="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 class="text-3xl font-extrabold text-nuxt-gray">Explore</h1>
        <p class="mt-2 mb-6 text-gray-600">
          Find all the websites built with VueJS
        </p>
        <div class>
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
              class="form-input rounded-full block pl-10 sm:text-sm sm:leading-8 border-gray-200 focus:shadow-outline-green focus:border-green-400"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
    </section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="pt-8 flex flex-col sm:flex-row">
        <div class="hidden sm:block h-full w-60 sticky top-0" :class="{ 'opacity-50': q.length }">
          <form class="mt-8">
            <FilterCheckboxes
              type="frameworks"
              name="Framework"
              @checkedItems="(items) => updateFilters('frameworks', items)"
            />
            <FilterCheckboxes
              type="uis"
              name="UI"
              class="mt-4"
              @checkedItems="(items) => updateFilters('uis', items)"
            />
            <FilterCheckboxes
              type="plugins"
              name="Plugin"
              class="mt-4"
              @checkedItems="(items) => updateFilters('plugins', items)"
            />
          </form>
        </div>
        <div class="sm:flex-1" style="min-height: 1000px;">
          <div
            class="mt-8 grid gap-8 mx-auto sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          >
            <template v-if="$fetchState.pending">
              <ContentLoader
                v-for="n in 12"
                :key="n"
                width="346"
                height="245"
                :speed="2"
              >
                <rect x="0" y="0" rx="4" ry="4" width="346" height="192" />
                <rect x="0" y="197" rx="4" ry="4" width="103" height="16" />
                <rect x="0" y="216" rx="4" ry="4" width="68" height="16" />
              </ContentLoader>
            </template>
            <template v-else>
              <ShowcasePreviewItem
                v-for="item in list"
                :key="item.id"
                :data="item"
                @openDrawer="handleOpen(item.id)"
              />
              <Drawer
                v-if="openedDrawer"
                panel-width="500"
                @close="handleClose"
              >
                <DrawerData :data="showcase" />
              </Drawer>
            </template>
          </div>
          <ClientOnly>
            <InfiniteLoading :identifier="infiniteId" @infinite="loadMore" />
          </ClientOnly>
        </div>
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

import ShowcasePreviewItem from '@/components/ShowcasePreviewItem'
import FilterCheckboxes from '@/components/FilterCheckboxes'
import Drawer from '@/components/Drawer/Drawer'
import DrawerData from '@/components/Drawer/DrawerData'

const QUERY_SHOWCASES = gql`
  query($limit: Int, $offset: Int, $slug: String) {
    showcases_aggregate(limit: $limit, offset: $offset) {
      aggregate {
        count
      }
      nodes {
        id
        slug
        url
        hostname
        domain
        screenshot_url
        vue_version
      }
    }
    showcases(where: { slug: { _eq: $slug } }) {
      id
      slug
      domain
      hostname
      url
      is_static
      has_ssr
      screenshot_url
      vue_version
      ui {
        name
        url
        img_path
      }
      framework {
        name
        url
        img_path
      }
      showcases_plugins {
        plugin {
          name
          url
          img_path
        }
      }
      showcase_modules {
        module {
          name
          url
          img_path
        }
      }
    }
  }
`
const QUERY_SHOWCASE = gql`
  query($id: uuid!) {
    showcases_by_pk(id: $id) {
      id
      slug
      domain
      hostname
      url
      is_static
      has_ssr
      screenshot_url
      vue_version
      ui {
        name
        url
        img_path
      }
      framework {
        name
        url
        img_path
      }
      showcases_plugins {
        plugin {
          name
          url
          img_path
        }
      }
      showcase_modules {
        module {
          name
          url
          img_path
        }
      }
    }
  }
`
const QUERY_FILTERED_SHOWCASES = gql`
  query($limit: Int, $offset: Int, $frameworks: [String!], $uis: [String!], $plugins: [String!]) {
    showcases_aggregate(
      limit: $limit
      offset: $offset
      where: {
        framework: { slug: { _in: $frameworks } }
        ui: { slug: { _in: $uis } }
        showcases_plugins: { plugin: { slug: { _in: $plugins } } }
      }
    ) {
      aggregate {
        count
      }
      nodes {
        id
        slug
        url
        hostname
        domain
        screenshot_url
        vue_version
      }
    }
  }
`

const QUERY_SEARCH_SHOWCASES = gql`
  query($limit: Int, $offset: Int, $q: String!) {
    showcases_aggregate(
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
      aggregate {
        count
      }
      nodes {
        id
        slug
        url
        hostname
        domain
        screenshot_url
        vue_version
      }
    }
  }
`
export default {
  components: {
    InfiniteLoading,
    ShowcasePreviewItem,
    ContentLoader,
    FilterCheckboxes,
    Drawer,
    DrawerData
  },
  async fetch () {
    const preview = this.$nuxt.context.route.query.preview
    const { data } = await this.$hasura({
      query: print(QUERY_SHOWCASES),
      variables: {
        limit: this.limit,
        offset: this.offset,
        slug: preview
      }
    })

    this.showcases = data ? data.showcases_aggregate.nodes : []
    if (preview && preview !== '') {
      this.showcase = data.showcases[0]
      this.openedDrawer = true
    }
  },
  data () {
    return {
      openedDrawer: false,
      infiniteId: +new Date(),
      limit: 12,
      offset: null,
      showcases: [],
      showcase: null,
      results: [],
      q: '',
      filters: {
        frameworks: null,
        uis: null,
        plugins: null
      }
    }
  },
  computed: {
    list () {
      return [...this.showcases, ...this.results]
    },
    hasFilters () {
      return this.filters.frameworks || this.filters.uis || this.filters.plugins
    }
  },
  watch: {
    q () {
      this.debouncedSearch()
    }
  },
  created () {
    this.debouncedSearch = _debounce(this.search, 500)
  },
  methods: {
    async handleOpen (id) {
      await this.$hasura({
        query: print(QUERY_SHOWCASE),
        variables: { id }
      }).then(({ data }) => {
        this.showcase = data.showcases_by_pk
        this.openedDrawer = true
        this.$router.replace(`/explore?preview=${data.showcases_by_pk.slug}`)
      })
    },
    handleClose () {
      this.showcase = null
      this.openedDrawer = false
      this.$router.replace('/explore')
    },
    async loadMore ($state) {
      let query
      const variables = {
        limit: this.limit,
        offset: this.offset + this.limit
      }

      if (this.q.trim() !== '') {
        query = QUERY_SEARCH_SHOWCASES
        variables.q = this.q
      } else if (this.hasFilters) {
        query = QUERY_FILTERED_SHOWCASES
        Object.assign(variables, this.filters)
      } else {
        query = QUERY_SHOWCASES
      }

      const { data } = await this.$hasura({
        query: print(query),
        variables
      })
      if (data.showcases_aggregate.aggregate.count) {
        this.offset += this.limit
        this.results.push(...data.showcases_aggregate.nodes)
        $state.loaded()
      } else {
        $state.complete()
      }
    },
    resetInfinite () {
      this.limit = 12
      this.offset = null
      this.results = []
      this.infiniteId += 1
    },
    updateFilters (type, value) {
      this.filters[type] = value.length ? value : null
      if (this.q) {
        return
      }
      this.resetInfinite()
      this.filter()
    },
    async filter () {
      this.$fetchState.pending = true
      let query
      const variables = {
        limit: this.limit,
        offset: this.offset
      }
      if (this.hasFilters) {
        query = QUERY_FILTERED_SHOWCASES
        Object.assign(variables, this.filters)
      } else {
        query = QUERY_SHOWCASES
      }
      const { data } = await this.$hasura({
        query: print(query),
        variables
      })

      this.showcases = data ? data.showcases_aggregate.nodes : []
      this.$fetchState.pending = false
    },
    async search () {
      this.$fetchState.pending = true
      const { data } = await this.$hasura({
        query: print(QUERY_SEARCH_SHOWCASES),
        variables: {
          q: `%${this.q}%`,
          limit: this.limit,
          offset: this.offset
        }
      })
      this.showcases = data ? data.showcases_aggregate.nodes : []
      this.$fetchState.pending = false
    }
  }
}
</script>

<style lang="postcss">
.infinite-loading-container {
  @apply mt-4;
}
.infinite-status-prompt {
  @apply text-gray-400 !important;
}
</style>
