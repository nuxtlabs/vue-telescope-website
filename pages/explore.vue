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
  async mounted() {
    // const aaa = await fetch(
    //   'http://localhost:8888/api/analyze?url=https://nuxtjs.org',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // )
    //   .then((response) => {
    //     return response.json()
    //   })
    //   .catch((err) => {
    //     throw new Error(err)
    //   })
    // console.log(aaa)
  }
}
</script>
