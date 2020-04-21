<template>
  <div>
    <template v-if="$fetchState.pending">loading...</template>
    <showcaseItem v-else :data="showcase" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import showcaseItem from '@/components/ShowcaseItem'

const QUERY_SHOWCASE = gql`
  query($slug: String!) {
    showcases(where: { slug: { _eq: $slug } }) {
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
      meta {
        title
        description
      }
      screenshot_url
    }
  }
`
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
