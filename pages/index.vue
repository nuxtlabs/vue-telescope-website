<template>
  <div class="">
    <HeroPropositionSection
      class="mt-56 max-w-readable-line-length px-4 mx-auto"
    />
    <HeroPresentationSection :featured="featured" class="" />
    <FeaturesSection class="px-4 max-w-container-max-width m-auto" />
    <BenefitsSection class="px-4 max-w-container-max-width m-auto" />
    <CtaSection class="" />
  </div>
</template>

<script>
import { fetchStrapi } from '@/functions/utils'

export default {
  async fetch() {
    // https://vue-telemetry-api.herokuapp.com/showcases/count
    // https://vue-telemetry-api.herokuapp.com/showcases/featured
    const featured = await fetchStrapi(
      'https://vue-telemetry-api.herokuapp.com/showcases?featured=true',
      { method: 'get' }
    )
    // const featured = await fetch(
    //   'https://vue-telemetry-api.herokuapp.com/showcases/featured'
    // )
    //   .then((response) => {
    //     console.log('FUCK')
    //     return response.json()
    //   })
    //   .catch((err) => {
    //     // throw new Error(err)
    //     return error({
    //       statusCode: err.statusCode,
    //       message: err.message
    //     })
    //   })
    this.featured = featured.map((item, index) => {
      return { ...item, index }
    })

    // return {
    //   featured: featured.map((item, index) => {
    //     return { ...item, index }
    //   })
    // }
  },
  data() {
    return {
      featured: null
    }
  },
  methods: {
    // handleClick(slug) {
    //   this.$router.push(`/explore?preview=${slug}`)
    // }
  }
}
</script>

<style></style>
