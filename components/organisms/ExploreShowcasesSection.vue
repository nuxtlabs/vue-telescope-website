<template>
  <div
    id="explore-showcases-section"
    class="flex max-w-container-max-width m-auto px-2"
  >
    <div id="explore-showcases-aside" class="w-1/4 hidden md:block">
      <!-- <ExploreShowcasesSearchInput
        class="mx-2 mr-0 mb-8"
        @update-filters="
          (query) => {
            updateQuery(query)
          }
        "
      /> -->
      <ExploreShowcasesSearchFilters
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

    <div id="explore-showcases-grid" class="md:w-3/4 w-full mb-4">
      <ExploreShowcasesSelectedFilters
        :selected-filters="filterQuery"
        :total-count="totalCount"
        class=""
        @clear-filters="$refs.filter && $refs.filter.clearFilters()"
        @clear-filter="$refs.filter && $refs.filter.clearFilter($event)"
      />

      <div
        v-if="$fetchState.pending && !showcases.length"
        class="flex flex-wrap min-h-full items-center justify-center"
      >
        <AppLoader
          class="w-12 h-12 mb-12"
          background="text-primary-200"
          path="text-primary-500"
        />
      </div>

      <div
        v-else-if="!showcases.length"
        class="flex flex-wrap min-h-full items-center justify-center"
      >
        <div class="text-seven leading-seven mb-12">
          No showcases found. Please
          <span
            class="text-primary-500 cursor-pointer font-bold-body-weight"
            @click="$refs.filter && $refs.filter.clearFilters()"
          >
            clear the filters
          </span>
        </div>
      </div>

      <div v-else class="flex flex-wrap">
        <!-- 
          v-observe-visibility="{
            callback: i === showcases.length - 1 ? lazyLoadShowcases : () => {},
            once: true
          }"
         -->
        <ExploreShowcasesCard
          v-for="showcase in showcases"
          :key="showcase.id"
          :showcase="showcase"
          class="w-full sm:w-1/2 md:w-1/3 mb-4"
        />
        <div class="w-full flex items-center justify-center px-8">
          <AppButton
            v-if="hasMoreShowcases"
            ref="load-more-button"
            outlined
            appearance="primary"
            class="w-1/3 flex items-center justify-center"
            @click.native="lazyLoadShowcases"
          >
            <div
              :class="[
                !$fetchState.pending
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-0'
              ]"
              class="transition duration-200 transform ease-in-out"
            >
              Load More
            </div>
            <div
              :class="[
                $fetchState.pending
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-0'
              ]"
              class="absolute transition duration-200 transform ease-in-out"
            >
              <AppLoader
                class="w-6 h-6"
                background="text-primary-100"
                path="text-primary-400"
              />
            </div>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  fetchOnServer: false,
  async fetch() {
    const showcases = await this.$strapi.find(
      `showcases${this.filterQueryString}`
    )
    const totalCount = await this.$strapi.find(
      `showcases/count${this.filterQueryString}`
    )
    this.totalCount = totalCount
    this.showcases.push(...showcases)
    if (
      showcases.length < this.showcasesPerPage ||
      this.showcases.length >= 96
    ) {
      this.hasMoreShowcases = false
    }
  },
  data() {
    return {
      showcases: [],
      totalCount: 0,
      currentPage: 0,
      showcasesPerPage: 24,
      hasMoreShowcases: true,
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
    currentPage() {
      if (process.browser) {
        this.$fetch()
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
      this.hasMoreShowcases = true
      this.$fetch()
    },
    lazyLoadShowcases(isVisible) {
      // initialy for intersection observer
      if (isVisible) {
        this.$refs['load-more-button'].$el.blur()
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
