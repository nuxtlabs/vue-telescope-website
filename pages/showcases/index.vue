<template>
  <div class="my-8">
    <h1 class="text-xl font-bold">All showcases</h1>
    <div class="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
      <template v-if="$fetchState.pending">loading...</template>
      <template v-else>
        <showcasePreviewItem
          v-for="showcase in showcases"
          :key="showcase.id"
          :data="showcase"
        />
      </template>
    </div>
  </div>
</template>

<script>
import showcasePreviewItem from '@/components/ShowcasePreviewItem'

const QUERY_ALL_SHOWCASES = `
  query {
    showcases {
      slug
      url
      hostname
      domain
      screenshot_url
      vue_version
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
  components: {
    showcasePreviewItem
  },
  async fetch() {
    this.$http.setHeader(
      'x-hasura-admin-secret',
      process.env.HASURA_ADMIN_SECRET_KEY
    ) // TODO: secure this
    const res = await this.$http.post(process.env.API_HASURA_URL, {
      query: QUERY_ALL_SHOWCASES
    })
    const { data } = await res.json()
    this.$nuxt.context.store.dispatch('setShowcases', data.showcases)
  },
  computed: {
    showcases() {
      return this.$store.getters.showcases
    }
  }
}
</script>

<style></style>
