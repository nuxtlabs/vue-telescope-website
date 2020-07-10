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
  // scrollToTop: true,
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  },
  beforeRouteEnter(to, from, next) {
    if (process.browser) {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 50)
    }
    next()
  }
  // async mounted() {
  //   const aaa = await fetch('/api/analyze?url=https://life.ru', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .catch((err) => {
  //       throw new Error(err)
  //     })
  //   console.log(aaa)
  // }
}
</script>
