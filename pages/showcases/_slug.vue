<template>
  <div>
    <template v-if="$fetchState.pending">loading...</template>
    <showcaseItem v-else :data="showcase" />
  </div>
</template>

<script>
import showcaseItem from '@/components/ShowcaseItem'

export default {
  components: {
    showcaseItem
  },
  async fetch() {
    const res = await this.$hasura.post('', {
      query: print(QUERY_SHOWCASE),
      variables: {
        slug: this.$nuxt.context.params.slug
      }
    })
    const { data } = await res.json()
    this.$nuxt.context.store.dispatch('setCurrentShowcase', data.showcases[0])
  },
  computed: {
    showcase() {
      return this.$store.getters.currentShowcase
    }
  }
}
</script>

<style></style>
