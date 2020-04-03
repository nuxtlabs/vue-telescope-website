<template>
  <div>
    <h1>showcases</h1>
    <ul>
      <li v-for="showcase in showcases" :key="showcase.id">
        <pre>{{ showcase }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
const QUERY_ALL_SHOWCASES = `
  query {
    showcases {
      slug
      url
      hostname
      domain
      framework {
        name
        frameworks_modules {
          module {
            name
          }
        }
      }
      showcases_categories {
        category {
          name
        }
      }
      showcases_plugins {
        plugin {
          name
        }
      }
      ui {
        url
      }
    }
  }
`
export default {
  async fetch({ $http, store }) {
    $http.setHeader(
      'x-hasura-admin-secret',
      process.env.HASURA_ADMIN_SECRET_KEY
    ) // TODO: secure this
    const res = await $http.post(process.env.API_HASURA_URL, {
      query: QUERY_ALL_SHOWCASES,
    })
    const { data } = await res.json()
    store.dispatch('setShowcases', data.showcases)
  },
  computed: {
    showcases() {
      return this.$store.getters.showcases
    },
  },
}
</script>

<style></style>
