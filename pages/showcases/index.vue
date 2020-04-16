<template>
  <div>
    <div class="flex flex-col sm:flex-row border-t border-gray-300">
      <div
        class="hidden sm:block p-2 w-60 overflow-auto sticky top-0 border-r border-gray-300"
        style="height: 37rem;"
      >
        <div class="w-full">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="search"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-300 focus:shadow-outline-blue sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        <form class="mt-4" action="#" method="POST">
          <fieldset>
            <legend class="text-sm leading-4 font-medium text-gray-900">
              Frameworks
            </legend>
            <div v-for="(f, i) in frameworks" :key="i" class="mt-4">
              <div class="flex items-start">
                <div class="absolute flex items-center h-5">
                  <input
                    :id="f.slug"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-green-400 cursor-pointer transition duration-150 ease-in-out"
                  />
                </div>
                <div class="pl-7 text-sm leading-5 flex flex-1">
                  <label
                    :for="f.slug"
                    class="font-medium text-gray-700 flex-1 cursor-pointer select-none"
                    >{{ f.name }}</label
                  >
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset class="mt-4">
            <legend class="text-sm leading-4 font-medium text-gray-900">
              UI
            </legend>
            <div v-for="(u, i) in uis" :key="i" class="mt-4">
              <div class="flex items-start">
                <div class="absolute flex items-center h-5">
                  <input
                    :id="u.slug"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-green-400 cursor-pointer transition duration-150 ease-in-out"
                  />
                </div>
                <div class="pl-7 text-sm leading-5 flex flex-1">
                  <label
                    :for="u.slug"
                    class="font-medium text-gray-700 flex-1 cursor-pointer select-none"
                    >{{ u.name }}</label
                  >
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="p-10 sm:flex-1" style="min-height: 1000px;">
        <div
          class="grid gap-10 max-w-lg mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-none"
        >
          <template v-if="$fetchState.pending">
            <content-loader
              v-for="n in 12"
              :key="n"
              width="346"
              height="245"
              speed="2"
            >
              <rect x="0" y="0" rx="4" ry="4" width="346" height="192" />
              <rect x="0" y="197" rx="4" ry="4" width="103" height="16" />
              <rect x="0" y="216" rx="4" ry="4" width="68" height="16" />
            </content-loader>
          </template>
          <template v-else>
            <showcasePreviewItem
              v-for="showcase in showcases"
              :key="showcase.id"
              :data="showcase"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import showcasePreviewItem from '@/components/ShowcasePreviewItem'

const QUERY_ALL_SHOWCASES = `
  query {
    showcases(limit: 12) {
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
    showcasePreviewItem,
    ContentLoader
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
    },
    frameworks() {
      return [
        { slug: 'vuejs', name: 'VueJS' },
        { slug: 'nuxtjs', name: 'NuxtJS' },
        { slug: 'gridsome', name: 'Gridsome' },
        { slug: 'vuepress', name: 'Vuepress' }
      ]
    },
    uis() {
      return [
        { slug: 'bootstrap', name: 'Bootstrap' },
        { slug: 'vuetify', name: 'Vuetify' },
        { slug: 'bulma', name: 'Bulma' },
        { slug: 'tailwind', name: 'Tailwind' }
      ]
    }
  }
}
</script>

<style></style>
