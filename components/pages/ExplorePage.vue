<template>
  <AsideContentTemplate>
    <ShowcasesSearchFilters
      slot="aside-content-aside"
      ref="filters"
      class="h-full overflow-y-auto overflow-x-hidden"
      @click.native="filtersTouched = true"
    />

    <template slot="aside-content-header">
      <ShowcasesMobileSearchFilters />
      <ShowcasesSorting class="-mt-9 md:-mt-8 mr-12 md:mr-6" />
      <ShowcasesSelectedFilters
        :selected-filters="selectedFilters"
        :total-count="totalCount"
        @clear-filters="$refs.filters && $refs.filters.clearFilters()"
        @clear-filter="$refs.filters && $refs.filters.clearFilter($event)"
      />
    </template>

    <ClientOnly slot="aside-content-main">
      <ShowcasesListingPlaceholders
        v-if="$fetchState.pending && !showcases.length && !isModal"
        :showcases-per-page="showcasesPerPage"
      />
      <ShowcasesNotFound
        v-else-if="!showcases.length && filtersTouched"
        @clear="$refs.filters && $refs.filters.clearFilters()"
      />

      <div v-else class="flex flex-wrap">
        <!--
          v-observe-visibility="{
            callback: i === showcases.length - 1 ? lazyLoadShowcases : () => {},
            once: true
          }"
          -->
        <ShowcasesListing
          :showcases="showcases"
          :showcases-per-page="showcasesPerPage"
        />
        <div class="w-full flex items-center justify-center px-8">
          <LoadMoreShowcasesButton
            v-if="hasMoreShowcases && showcases.length"
            :pending="$fetchState.pending"
            @update="currentPage++"
          />
        </div>
      </div>
    </ClientOnly>
  </AsideContentTemplate>
</template>

<script>
import { mapState } from 'vuex'
import qs from 'qs'

const allowedFilters = [
  '_q',
  'framework.slug',
  'framework_null',
  'ui.slug',
  'ui_null',
  'plugins.slug',
  'modules.slug',
  'vueVersion_gte'
]

function filterFilters(raw) {
  return Object.keys(raw)
    .filter((key) => allowedFilters.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

function filterSort(raw) {
  return Object.keys(raw)
    .filter((key) => key === '_sort')
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

export default {
  fetchOnServer: false,
  data() {
    return {
      showcases: [],
      totalCount: 0,
      currentPage: 0,
      showcasesPerPage: 24,
      hasMoreShowcases: true,
      filtersTouched: false
      // filterQuery: {}
    }
  },
  async fetch() {
    if (this.isModal) return
    // if (
    //   Object.keys(this.filterQuery).length === 0 &&
    //   Object.keys(this.$route.query).length > 0
    // ) {
    //   // trigger only once on page load
    //   // TODO: fired second time when no filters (but safe for now)
    //   this.$store.commit('SET_FILTERS', filterFilters(this.$route.query))
    // }
    // console.log('filterQueryString 1: ', this.selectedFilters)
    const showcases = await this.$strapi.find(
      `showcases${this.filterQueryString}`
    )
    // const showcases = await this.$strapi.find('showcases', this.selectedFilters)
    // console.log('filterQueryString 2: ', this.filterQueryString)

    const totalCount = await this.$strapi.find(
      `showcases/count${this.filterQueryString}`
    )
    this.totalCount = totalCount
    this.showcases = [...this.showcases, ...showcases]
    if (
      showcases.length < this.showcasesPerPage ||
      this.showcases.length >= 96
    ) {
      this.hasMoreShowcases = false
    }
  },
  computed: {
    ...mapState({
      selectedFilters: (state) => state.selectedFilters,
      selectedSort: (state) => state.selectedSort,
      isMobile: (state) => state.isMobile,
      isModal: (state) => state.isModal
    }),
    filterQueryString() {
      return qs.stringify(
        {
          ...this.selectedFilters,
          _limit: this.showcasesPerPage,
          _start: this.currentPage * this.showcasesPerPage,
          ...this.selectedSort
        },
        {
          arrayFormat: 'repeat',
          addQueryPrefix: true
        }
      )
    }
  },
  watch: {
    isModal(value) {
      // performance improvement hack
      // do not fetch showcases when navigating from Landing slider
      // fetch after it's modal closed
      if (!value && !this.showcases.length) {
        this.$fetch()
      }
    },
    currentPage() {
      if (process.browser) {
        this.$fetch()
      }
    },
    selectedFilters: {
      deep: true,
      handler(value) {
        this.updateListing()
      }
    },
    selectedSort(value) {
      this.updateListing()
    },
    $route(newValue, oldValue) {
      if (oldValue.params.website) {
        // set query params when close showcase modal and have filters selected
        this.$router.push({
          query: { ...this.selectedFilters, ...this.selectedSort }
        })
      }
    }
  },
  created() {
    if (
      Object.keys(this.selectedFilters).length === 0 &&
      Object.keys(this.$route.query).length > 0
    ) {
      // trigger only once on page load
      // TODO: fired second time when no filters (but safe for now)
      this.$store.commit('SET_FILTERS', filterFilters(this.$route.query))
      this.$store.commit('setSort', filterSort(this.$route.query))
    }
  },
  methods: {
    updateListing() {
      window.scrollTo(0, 0)
      // this.filterQuery = value
      this.$router.push({
        query: {
          ...this.selectedFilters,
          ...this.selectedSort
        }
      })
      this.currentPage = 0
      this.hasMoreShowcases = true
      setTimeout(() => {
        this.showcases = []
        this.$fetch()
      })
    }
  }
}
</script>
