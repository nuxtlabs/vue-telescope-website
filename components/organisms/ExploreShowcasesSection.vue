<template>
  <div
    id="explore-showcases-section"
    class="flex items-start max-w-container-max-width m-auto px-2"
  >
    <ExploreShowcasesSearchFilter
      class="w-1/4"
      @update-filters="
        (query) => {
          updateQuery(query)
        }
      "
    />
    <!-- <pre>{{ filterQueryString }}</pre> -->
    <!-- <ExploreShowcasesGrid :showcases="showcases" class="w-3/4" /> -->
    <div id="explore-showcases-grid" class="flex flex-wrap w-3/4">
      <div v-if="!showcases || !showcases.length">
        No showcases found. Please clear the filters {{ showcases.length }}
      </div>
      <ExploreShowcasesCard
        v-for="(showcase, i) in showcases"
        :key="showcase.id"
        v-observe-visibility="{
          callback: i === showcases.length - 1 ? lazyLoadShowcases : false,
          once: true
        }"
        :showcase="showcase"
      />
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
      currentPage: 0,
      filterQuery: {
        _limit: 12
      }
    }
  },
  computed: {
    filterQueryString() {
      return qs.stringify(
        {
          ...this.filterQuery,
          _start: this.currentPage * this.filterQuery._limit
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
      this.filterQuery = { ...this.filterQuery, ...query }
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

<style></style>
