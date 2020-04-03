<template>
  <div>
    <h1 class="text-xl font-bold">{{ showcase.hostname }}</h1>
    <pre>{{ showcase }}</pre>
  </div>
</template>

<script>
export default {
  async fetch({ $http, store, params }) {
    $http.setHeader(
      'x-hasura-admin-secret',
      process.env.HASURA_ADMIN_SECRET_KEY
    ) // TODO: secure this
    const res = await $http.post(process.env.API_HASURA_URL, {
      query: `
        {
          showcases(where: {slug: {_eq: "${params.slug}"}}) {
            id
            is_static
            hostname
            has_ssr
            framework_version
            domain
            framework {
              name
              slug
              url
            }
            meta {
              description
              favicon
              id
              language
              title
            }
            screenshot_url
          }
        }
      `,
    })
    const { data } = await res.json()
    store.dispatch('setCurrentShowcase', data.showcases[0])
  },
  computed: {
    showcase() {
      return this.$store.getters.currentShowcase
    },
  },
}
</script>

<style></style>
