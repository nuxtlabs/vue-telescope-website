<template>
  <div class="px-2">
    <div>
      <div
        class="text-primary-700 text-seven leading-seven font-display-weight"
      >
        SSR
      </div>
      <div
        class="border border-grey-300 inline-flex rounded-lg overflow-hidden"
      >
        <div
          v-for="(value, i) in [true, false]"
          :key="i"
          class="px-3 py-1"
          :class="[queryFilter['hasSSR'] === value && 'bg-grey-300']"
          @click="radioFilter('hasSSR', value)"
        >
          <CheckmarkCircleFillIcon v-if="value" class="w-4 text-green-500" />
          <XmarkCircleFillIcon v-else class="w-4 text-grey-700" />
        </div>
      </div>
    </div>

    <div>
      <div
        v-for="framework in frameworks"
        :key="framework.id"
        :class="[
          queryFilter['framework.slug'] &&
            queryFilter['framework.slug'].includes(framework.slug) &&
            'bg-grey-400'
        ]"
        @click="radioFilter('framework.slug', framework.slug)"
      >
        {{ framework.name }}
      </div>
    </div>

    <div>
      <div
        v-for="ui in uis"
        :key="ui.id"
        :class="[
          queryFilter['ui.slug'] &&
            queryFilter['ui.slug'].includes(ui.slug) &&
            'bg-grey-400'
        ]"
        @click="radioFilter('ui.slug', ui.slug)"
      >
        {{ ui.name }}
      </div>
    </div>

    <div>
      <div
        v-for="plugin in plugins"
        :key="plugin.id"
        :class="[
          queryFilter['plugins.slug'] &&
            queryFilter['plugins.slug'].includes(plugin.slug) &&
            'bg-grey-400'
        ]"
        @click="checkboxFilter('plugins.slug', plugin.slug)"
      >
        {{ plugin.name }}
      </div>
    </div>
    <div>
      <div
        v-for="module in modules"
        :key="module.id"
        :class="[
          queryFilter['modules.slug'] &&
            queryFilter['modules.slug'].includes(module.slug) &&
            'bg-grey-400'
        ]"
        @click="checkboxFilter('modules.slug', module.slug)"
      >
        {{ module.name }}
      </div>
    </div>

    <pre>{{ queryFilter }}</pre>
  </div>
</template>

<script>
import qs from 'qs'
import { fetchStrapi } from '@/functions/utils'
import XmarkCircleFillIcon from '@/assets/icons/xmark-circle-fill.svg?inline'
import CheckmarkCircleFillIcon from '@/assets/icons/checkmark-circle-fill.svg?inline'

export default {
  components: {
    XmarkCircleFillIcon,
    CheckmarkCircleFillIcon
  },
  async fetch() {
    // https://vue-telemetry-api.herokuapp.com/frameworks
    // https://vue-telemetry-api.herokuapp.com/modules
    // https://vue-telemetry-api.herokuapp.com/plugins
    // https://vue-telemetry-api.herokuapp.com/uis
    // TODO: rewrite to parallel
    for (const t of ['frameworks', 'modules', 'plugins', 'uis']) {
      const technology = await fetchStrapi(
        `https://vue-telemetry-api.herokuapp.com/${t}`,
        {
          method: 'get'
        }
      )
      if (technology.length) {
        this[t] = technology
      } else {
        // set status code on server
        if (process.server) {
          this.$nuxt.context.res.statusCode = 404
        }
        throw new Error('Thing not found')
      }
    }
  },
  data() {
    return {
      frameworks: null,
      modules: null,
      plugins: null,
      uis: null,
      queryFilter: {}
    }
  },
  // watch: {
  //   queryFilter: {
  //     deep: true,
  //     handler(newValue) {
  //       console.log('WATCH')
  //     }
  //   }
  // },
  methods: {
    checkboxFilter(key, value) {
      console.log('checkbox', value)
      this.$set(
        this.queryFilter,
        key,
        this.queryFilter[key]
          ? this.queryFilter[key].includes(value)
            ? [...this.queryFilter[key].filter((i) => i !== value)]
            : [...this.queryFilter[key], value]
          : [value]
      )
      // console.log(qs.stringify(this.queryFilter, { arrayFormat: 'repeat' }))
      this.updateFilters()
    },
    radioFilter(key, value) {
      if (this.queryFilter[key] === value) {
        console.log('radio', value)
        this.$delete(this.queryFilter, key)
      } else {
        this.$set(this.queryFilter, key, value)
      }

      this.updateFilters()
      // console.log()
    },
    updateFilters() {
      this.$emit(
        'update-filters',
        qs.stringify(this.queryFilter, {
          arrayFormat: 'repeat',
          addQueryPrefix: true
        })
      )
    }
  }
}
</script>

<style></style>
