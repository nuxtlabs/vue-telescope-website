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
    this.$http.setHeader(
      'x-hasura-admin-secret',
      process.env.HASURA_ADMIN_SECRET_KEY
    ) // TODO: secure this
    const res = await this.$http.post(process.env.API_HASURA_URL, {
      query: `
        {
          showcases(where: {slug: {_eq: "${this.$nuxt.context.params.slug}"}}) {
            id
            url
            hostname
            domain
            vue_version
            is_static
            has_ssr
            framework {
              name
              slug
              url
            }
            meta {
              language
              title
              description
            }
            ui {
              name
            }
            showcase_modules {
              module {
                id
                name
              }
            }
            showcases_plugins {
              plugin {
                name
              }
            }
            screenshot_url
          }
        }
      `
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
