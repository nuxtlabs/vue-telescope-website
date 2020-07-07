<template>
  <div class="pt-8">
    <ExploreShowcasesSection
      v-if="!$route.params.website || ($route.params.website && twitterLike)"
    />

    <NuxtChild :key="$route.params.website" keep-alive />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  },
  mounted() {
    console.log('NETLIFY_DEV', process.env.NETLIFY_DEV)
  }
}
</script>
