<template>
  <div>
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
  }
}
</script>
