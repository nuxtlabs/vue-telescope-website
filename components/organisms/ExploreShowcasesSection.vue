<template>
  <div
    id="explore-showcases-section"
    class="flex items-start max-w-container-max-width m-auto px-2"
  >
    <div id="explore-showcases-aside" class="flex flex-col w-1/4">
      <div>{{ totalCount }}</div>
      <div class="px-2 pr-6 mb-4">
        <AppInput class="pl-8" size="base" />
      </div>
      <ExploreShowcasesSearchFilter
        id="explore-showcases-controls"
        ref="filter"
        class="h-full"
        @update-filters="
          (query) => {
            updateQuery(query)
          }
        "
      />
    </div>
    <!-- <pre>{{ filterQuery }}</pre> -->
    <div id="explore-showcases-grid" class="w-3/4">
      <ExploreShowcasesSelectedFilters
        :selected-filters="filterQuery"
        @clear-filters="$refs.filter && $refs.filter.clearFilters()"
        @clear-filter="$refs.filter && $refs.filter.clearFilter($event)"
      />
      <div class="flex flex-wrap">
        <div v-if="$fetchState.pending && !showcases.length">
          Data is fetching...
        </div>
        <div v-else-if="!showcases || !showcases.length">
          No showcases found. Please
          <span
            class="text-primary-500 cursor-pointer"
            @click="$refs.filter && $refs.filter.clearFilters()"
          >
            clear the filters
          </span>
        </div>
        <ExploreShowcasesCard
          v-for="(showcase, i) in showcases"
          v-else
          :key="showcase.id"
          v-observe-visibility="{
            callback: i === showcases.length - 1 ? lazyLoadShowcases : () => {},
            once: true
          }"
          :showcase="showcase"
          class="w-full sm:w-1/2 md:w-1/3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  async fetch() {
    const showcases = await this.$strapi.find(
      `showcases${this.filterQueryString}`
    )
    const totalCount = await this.$strapi.find(
      `showcases/count${this.filterQueryString}`
    )
    this.totalCount = totalCount
    if (showcases.length) {
      this.showcases.push(...showcases)
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      // this.showcases = []
      throw new Error('Showcases not found')
    }
  },
  data() {
    return {
      showcases: [],
      totalCount: 0,
      currentPage: 0,
      showcasesPerPage: 12,
      filterQuery: {}
    }
  },
  computed: {
    filterQueryString() {
      return qs.stringify(
        {
          ...this.filterQuery,
          _limit: this.showcasesPerPage,
          _start: this.currentPage * this.showcasesPerPage
        },
        {
          arrayFormat: 'repeat',
          addQueryPrefix: true
        }
      )
    }
  },
  watch: {
    currentPage: {
      deep: true,
      handler() {
        if (process.browser) {
          this.$fetch()
        }
      }
    }
  },
  methods: {
    updateQuery(query) {
      // console.log(query)
      // this.filterQuery = { ...this.filterQuery, ...query }
      this.filterQuery = query
      this.currentPage = 0
      this.showcases = []
      this.$fetch()
    },
    lazyLoadShowcases(isVisible) {
      if (isVisible) {
        this.currentPage++
      }
    }
  }
}
</script>

<style scoped>
#explore-showcases-aside {
  position: sticky;
  top: calc(theme('spacing.16') + theme('spacing.8'));
  height: calc(100vh - theme('spacing.16') - theme('spacing.8'));
}
#explore-showcases-controls {
  /* height: calc(100vh - theme('spacing.16') - theme('spacing.8')); */
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
