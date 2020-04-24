<template>
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div v-if="$fetchState.pending" class="flex flex-col sm:flex-row">
      <showcaseBrowser url="loading..." class="flex-1 sm:w-1/2" />
      <div class="flex-1 sm:w-1/2">
        TODO: content placeholders
      </div>
    </div>
    <showcaseItem v-else :data="showcase" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import showcaseItem from '@/components/ShowcaseItem'
import showcaseBrowser from '@/components/ShowcaseBrowser'

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
    showcaseItem,
    showcaseBrowser
  },
  async fetch() {
    const { data } = await this.$hasura({
      query: print(QUERY_SHOWCASE),
      variables: {
        slug: this.$nuxt.context.params.slug
      }
    })

    this.$nuxt.context.store.dispatch(
      'setCurrentShowcase',
      data ? data.showcases[0] : {}
    )
  },
  computed: {
    showcase() {
      return this.$store.getters.currentShowcase
    }
  }
}
</script>

<style></style>
