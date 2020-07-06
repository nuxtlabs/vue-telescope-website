<template>
  <div
    id="explore-showcases-section"
    class="flex items-start max-w-container-max-width m-auto px-2"
  >
    <ExploreShowcasesSearchFilter
      class="w-1/4"
      @update-filters="
        (query) => {
          filterQuery = query
          $fetch()
        }
      "
    />
    <ExploreShowcasesGrid :showcases="showcases" class="w-3/4" />
  </div>
</template>

<script>
export default {
  async fetch() {
    const showcases = await this.$strapi.find(`showcases${this.filterQuery}`)
    if (showcases.length) {
      this.showcases = showcases
    } else {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      this.showcases = []
      throw new Error('Showcases not found')
    }
  },
  data() {
    return {
      showcases: null,
      filterQuery: '?_limit=9'
    }
  }
}
</script>

<style></style>
