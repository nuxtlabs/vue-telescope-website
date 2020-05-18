<template>
  <div>
    <section id="hero" class>
      <div class="max-w-6xl mx-auto pt-4 pb-0 sm:py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 class="text-center sm:text-left text-3xl font-extrabold text-nuxt-gray">Explore</h1>
        <p class="text-center sm:text-left mt-2 mb-6 text-gray-600">
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
              class="form-input rounded-full block w-full sm:w-auto pl-10 sm:text-sm sm:leading-8 border-gray-200 focus:shadow-outline-green focus:border-green-400"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
    </section>
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="pt-0 sm:pt-8 flex flex-col sm:flex-row">
        <div class="sm:h-full sm:w-60 sm:sticky sm:top-0 transition ease-linear duration-150" :class="{ 'opacity-50': q.length }">
          <div class="relative block text-left">
            <div class="sm:hidden mt-4 sm:mt-8 flex flex-row items-center justify-between">
              <span class="rounded-md shadow-sm">
                <button type="button" class="inline-flex justify-center w-full rounded-full border border-gray-200 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:border-green-400 focus:shadow-outline-green active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" @click="toggleFilters">
                  Filters
                  <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </span>
              <p class="text-nuxt-gray font-extrabold">
                <span class="text-nuxt-lightgreen">{{ count }}</span> websites
              </p>
            </div>
            <div id="filters" tabindex="0" class="hidden sm:block origin-top-left absolute sm:relative left-0 mt-2 sm:mt-0 w-56 sm:w-auto rounded-md sm:rounded-none shadow-lg sm:shadow-none focus:outline-none" @focusout="toggleFilters">
              <div class="rounded-md sm:rounded-none bg-white sm:bg-transparent shadow-xs sm:shadow-none">
                <div class="p-4 sm:p-0">
                  <form class="sm:ml-2 sm:mt-8">
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
              </div>
            </div>
          </div>
        </div>
        <div class="sm:flex-1" style="min-height: 1000px;">
          <div class="hidden sm:block">
            <p class="text-nuxt-gray font-extrabold text-right">
              <span class="text-nuxt-lightgreen">{{ count }}</span> websites
            </p>
          </div>
          <div
            class="mt-4 grid gap-8 mx-auto sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          >
            <template v-if="pending && !showcases.length">
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
            <template v-else-if="showcases.length">
              <ShowcasePreviewItem
                v-for="item in showcases"
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
            <template v-else>
              <div class="sm:col-span-1 md:col-span-2 xl:col-span-3">
                <p class="text-center text-sm text-gray-400">No website found.</p>
              </div>
            </template>
          </div>
          <ClientOnly>
            <InfiniteLoading v-if="showcases.length" :identifier="infiniteId" @infinite="loadMore" />
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

const QUERY_SHOWCASES = (args) => {
  const query = `
    query {
      total: showcases_aggregate { aggregate { count } }
      showcases: showcases_aggregate(limit: ${args.limit}, offset: ${args.offset}) {
        aggregate {
          count
        }
        nodes {id slug url hostname domain screenshot_url ui { name url img_path } framework { name url img_path } }
      }
      ${args.slug ? 'previews: showcases(where: {slug: {_eq:' + JSON.stringify(args.slug) + ' }}) { id slug domain hostname url is_static has_ssr screenshot_url vue_version ui { name url img_path } framework { name url img_path } showcases_plugins { plugin { name url img_path } } showcase_modules { module { name url img_path } } }' : ''}
    }
  `
  return gql(query)
}

const QUERY_SHOWCASE = gql`
  query($id: uuid!) {
    showcase: showcases_by_pk(id: $id) {
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
const QUERY_FILTERED_SHOWCASES = ({ limit, offset, where }) => {
  const query = `
    query {
      showcases: showcases_aggregate(
        limit: ${limit}
        ${offset ? 'offset: ' + offset : ''}
        where: {
          ${where.frameworks ? 'framework: { slug: { _in: ' + JSON.stringify(where.frameworks) + ' } }' : ''}
          ${where.uis ? 'ui: { slug: { _in: ' + JSON.stringify(where.uis) + ' } }' : ''}
          ${where.plugins ? 'showcases_plugins: { plugin: { slug: { _in: ' + JSON.stringify(where.plugins) + ' } } }' : ''}
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
        }
      }
    }`
  return gql(query)
}

const QUERY_SEARCH_SHOWCASES = gql`
  query($limit: Int, $offset: Int, $q: String) {
    showcases: search_showcases_aggregate(args: { search: $q }, limit: $limit, offset: $offset) {
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
    this.pending = true
    const preview = this.$nuxt.context.route.query.preview
    const query = QUERY_SHOWCASES({
      limit: this.limit,
      offset: this.offset,
      slug: preview
    })
    const { data } = await this.$hasura({
      query: print(query)
    })
    this.count = data.total.aggregate.count
    this.showcases = data ? data.showcases.nodes : []
    this.pending = false
    if (preview && preview !== '') {
      this.showcase = data.previews[0]
      this.openedDrawer = true
    }
  },
  data () {
    return {
      pending: false,
      openedDrawer: false,
      infiniteId: +new Date(),
      limit: 12,
      offset: null,
      count: null,
      showcases: [],
      showcase: null,
      q: '',
      filters: {
        frameworks: null,
        uis: null,
        plugins: null
      }
    }
  },
  computed: {
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
    toggleFilters () {
      document.getElementById('filters').classList.toggle('hidden')
      document.getElementById('filters').focus()
    },
    async handleOpen (id) {
      await this.$hasura({
        query: print(QUERY_SHOWCASE),
        variables: { id }
      }).then(({ data }) => {
        this.showcase = data.showcase
        this.openedDrawer = true
        this.$router.replace(`/explore?preview=${data.showcase.slug}`)
      })
    },
    handleClose () {
      this.showcase = null
      this.openedDrawer = false
      this.$router.replace('/explore')
    },
    async loadMore ($state) {
      if (this.pending || !this.showcases.length) {
        return setTimeout(() => $state.loaded(), 500)
      }
      this.pending = true
      let query
      let variables = {
        limit: this.limit,
        offset: this.offset + this.limit
      }

      if (this.q.trim()) {
        query = QUERY_SEARCH_SHOWCASES
        variables.q = `${this.q}%`
      } else if (this.hasFilters) {
        variables.where = this.filters
        query = QUERY_FILTERED_SHOWCASES(variables)
        // no variables to give
        variables = {}
      } else {
        query = QUERY_SHOWCASES(variables)
        // no variables to give
        variables = {}
      }

      const { data } = await this.$hasura({
        query: print(query),
        variables
      })

      if (data.showcases.nodes.length) {
        this.offset += this.limit
        this.showcases.push(...data.showcases.nodes)
        $state.loaded()
      } else {
        $state.complete()
      }
      this.pending = false
    },
    resetInfinite () {
      this.limit = 12
      this.offset = null
      this.showcases = []
      this.infiniteId += 1
    },
    updateFilters (type, value) {
      this.filters[type] = value.length ? value : null
      if (this.q.trim()) {
        return
      }
      window.scrollTo && window.scrollTo(0, Math.min(window.scrollY, 380))
      this.resetInfinite()
      this.filter()
    },
    async filter () {
      let query
      let variables = {
        limit: this.limit,
        offset: this.offset
      }
      if (this.hasFilters) {
        variables.where = this.filters
        query = QUERY_FILTERED_SHOWCASES(variables)
        // no variables to give
        variables = {}
      } else {
        query = QUERY_SHOWCASES(variables)
        // no variables to give
        variables = {}
      }
      this.pending = true
      const { data } = await this.$hasura({
        query: print(query),
        variables
      })
      this.showcases.push(...data.showcases.nodes)
      this.pending = false
    },
    async search () {
      this.resetInfinite()
      if (!this.q.trim()) {
        this.filter()
        return
      }
      this.pending = true
      let variables = {
        q: this.q,
        limit: this.limit,
        offset: this.offset
      }
      let query = QUERY_SEARCH_SHOWCASES
      if (this.q.trim() === '') {
        query = QUERY_SHOWCASES(variables)
        // no variables to give
        variables = {}
      }
      const { data } = await this.$hasura({
        query: print(query),
        variables
      })

      this.showcases = data ? data.showcases.nodes : []
      this.pending = false
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
