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
        ref="filters"
        class="h-full"
      />
    </div>

    <div id="explore-showcases-grid" class="relative md:w-3/4 w-full mb-4">
      <ExploreShowcasesMobileSearchFilters />

      <ExploreShowcasesSelectedFilters
        :selected-filters="selectedFilters"
        :total-count="totalCount"
        class=""
        @clear-filters="$refs.filters && $refs.filters.clearFilters()"
        @clear-filter="$refs.filters && $refs.filters.clearFilter($event)"
      />

      <!-- <div
        v-if="$fetchState.pending && !showcases.length"
        class="flex flex-wrap min-h-full items-center justify-center"
      >
        <AppLoader
          class="w-12 h-12 mb-12"
          background="text-primary-200"
          path="text-primary-500"
        />
      </div> -->

      <div
        v-if="$fetchState.pending && !showcases.length && !isModal"
        class="flex flex-wrap mt-5"
      >
        <div
          v-for="showcasePlaceholder in isMobile ? 3 : showcasesPerPage"
          :key="showcasePlaceholder"
          class="w-full sm:w-1/2 md:w-1/3 mb-16 px-5"
        >
          <ContentPlaceholders rounded>
            <ContentPlaceholdersText
              class="custom relative h-full w-full mb-4 rounded-lg overflow-hidden"
              :lines="1"
              style="padding-bottom: 75%;"
            />
            <div class="flex justify-between">
              <ContentPlaceholdersText class="custom h-4 w-2/3" :lines="1" />
              <div class="flex">
                <ContentPlaceholdersText
                  class="custom rounded-full overflow-hidden h-4 w-4 mr-1"
                  :lines="1"
                />
                <ContentPlaceholdersText
                  class="custom rounded-full overflow-hidden h-4 w-4"
                  :lines="1"
                />
              </div>
            </div>
          </ContentPlaceholders>
        </div>
      </div>

      <div
        v-else-if="!showcases.length"
        class="flex flex-wrap min-h-full items-center justify-center"
      >
        <div class="text-seven leading-seven mb-12">
          No showcases found. Please
          <span
            class="text-primary-500 cursor-pointer font-bold-body-weight"
            @click="$refs.filters && $refs.filters.clearFilters()"
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
            class="w-auto sm:w-1/3 flex items-center justify-center"
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
import { mapState } from 'vuex'
import qs from 'qs'

const allowed = [
  'framework.slug',
  'framework_null',
  'ui.slug',
  'ui_null',
  'plugins.slug',
  'modules.slug'
]

function filterObject(raw) {
  return Object.keys(raw)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

export default {
  fetchOnServer: false,
  async fetch() {
    // if (
    //   Object.keys(this.filterQuery).length === 0 &&
    //   Object.keys(this.$route.query).length > 0
    // ) {
    //   // trigger only once on page load
    //   // TODO: fired second time when no filters (but safe for now)
    //   this.$store.commit('SET_FILTERS', filterObject(this.$route.query))
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
      hasMoreShowcases: true
      // filterQuery: {}
    }
  },
  computed: {
    ...mapState({
      selectedFilters: (state) => state.selectedFilters,
      isMobile: (state) => state.isMobile,
      isModal: (state) => state.isModal
    }),
    filterQueryString() {
      return qs.stringify(
        {
          ...this.selectedFilters,
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
    },
    selectedFilters: {
      deep: true,
      handler(value) {
        // console.log('TRIGGERED')
        window.scrollTo(0, 0)
        // this.filterQuery = value
        this.$router.push({ query: value })
        this.currentPage = 0
        this.hasMoreShowcases = true
        setTimeout(() => {
          this.showcases = []
          this.$fetch()
        })
      }
    },
    $route(newValue, oldValue) {
      if (oldValue.params.website) {
        // set query params when close showcase modal and have filters selected
        this.$router.push({ query: this.selectedFilters })
      }
    }
  },
  created() {
    // console.log('created', this.$route)
    if (
      Object.keys(this.selectedFilters).length === 0 &&
      Object.keys(this.$route.query).length > 0
    ) {
      // trigger only once on page load
      // TODO: fired second time when no filters (but safe for now)
      this.$store.commit('SET_FILTERS', filterObject(this.$route.query))
    }
  },
  methods: {
    // updateQuery(query) {
    //   // console.log(query)
    //   // this.filterQuery = { ...this.filterQuery, ...query }
    //   // this.filterQuery = query
    //   // this.currentPage = 0
    //   // this.showcases = []
    //   // this.hasMoreShowcases = true
    //   // this.$fetch()
    // },
    lazyLoadShowcases(isVisible) {
      // method made initialy for intersection observer (thats why isVisible present)
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
