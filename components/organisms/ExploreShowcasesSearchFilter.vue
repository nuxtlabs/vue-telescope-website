<template>
  <div class="px-2">
    <div class="mb-4">
      <AppFilterLabel>SSR</AppFilterLabel>
      <div class="flex flex-col">
        <div v-for="(value, i) in [true, false]" :key="i" class="mb-1">
          <AppCheckbox
            :id="`ssr-${value}`"
            :checked="
              queryFilter['hasSSR'] && queryFilter['hasSSR'].includes(value)
            "
            class=""
            :label="value ? 'have SSR' : 'doesn\'t have SSR'"
            @input="checkboxFilter('hasSSR', value)"
          />
        </div>

        <!-- <div
          v-for="(value, i) in [true, false]"
          :key="i"
          class="px-3 py-1"
          :class="[queryFilter['hasSSR'] === value && 'bg-grey-300']"
          @click="radioFilter('hasSSR', value)"
        >
          <CheckmarkCircleFillIcon v-if="value" class="w-4 text-green-500" />
          <XmarkCircleFillIcon v-else class="w-4 text-grey-700" />
        </div> -->
      </div>
    </div>

    <div class="mb-4">
      <AppFilterLabel>Static</AppFilterLabel>
      <div class="flex flex-col">
        <div v-for="(value, i) in [true, false]" :key="i" class="mb-1">
          <AppCheckbox
            :id="`static-${value}`"
            :checked="
              queryFilter['isStatic'] && queryFilter['isStatic'].includes(value)
            "
            class=""
            :label="value ? 'static' : 'not static'"
            @input="checkboxFilter('isStatic', value)"
          />
        </div>
      </div>
    </div>

    <div class="mb-4">
      <AppFilterLabel>Framework</AppFilterLabel>
      <!-- <div
        v-for="framework in frameworks"
        :key="framework.id"
        :class="[
          queryFilter['framework.slug'] &&
            queryFilter['framework.slug'].includes(framework.slug) &&
            'bg-grey-400'
        ]"
        @click="radioFilter('framework.slug', framework.slug)"
      > -->
      <div v-for="framework in frameworks" :key="framework.id" class="mb-1">
        <AppRadio
          :id="`framework-${framework.slug}`"
          :checked="
            queryFilter['framework.slug'] &&
            queryFilter['framework.slug'].includes(framework.slug)
          "
          class=""
          :label="framework.name"
          @input="radioFilter('framework.slug', framework.slug)"
        />
      </div>
    </div>

    <div class="mb-4">
      <AppFilterLabel>UI Framework</AppFilterLabel>
      <!-- <div
        v-for="ui in uis"
        :key="ui.id"
        :class="[
          queryFilter['ui.slug'] &&
            queryFilter['ui.slug'].includes(ui.slug) &&
            'bg-grey-400'
        ]"
        @click="radioFilter('ui.slug', ui.slug)"
      > -->
      <div v-for="ui in uis" :key="ui.id" class="mb-1">
        <AppRadio
          :id="`ui-${ui.slug}`"
          :checked="
            queryFilter['ui.slug'] && queryFilter['ui.slug'].includes(ui.slug)
          "
          class=""
          :label="ui.name"
          @input="radioFilter('ui.slug', ui.slug)"
        />
      </div>
    </div>

    <div class="mb-4">
      <AppFilterLabel>Plugins</AppFilterLabel>
      <!-- <div
        v-for="plugin in plugins"
        :key="plugin.id"
        :class="[
          queryFilter['plugins.slug'] &&
            queryFilter['plugins.slug'].includes(plugin.slug) &&
            'bg-grey-400'
        ]"
        @click="checkboxFilter('plugins.slug', plugin.slug)"
      > -->
      <div v-for="plugin in plugins" :key="plugin.id" class="mb-1">
        <AppCheckbox
          :id="`plugin-${plugin.slug}`"
          :checked="
            queryFilter['plugins.slug'] &&
            queryFilter['plugins.slug'].includes(plugin.slug)
          "
          class=""
          :label="plugin.name"
          @input="checkboxFilter('plugins.slug', plugin.slug)"
        />
      </div>
    </div>

    <template v-if="queryFilter['framework.slug'] === 'nuxtjs'">
      <div class="mb-4">
        <AppFilterLabel>Modules</AppFilterLabel>
        <div v-for="module in modules" :key="module.id" class="mb-1">
          <AppCheckbox
            :id="`module-${module.slug}`"
            :checked="
              queryFilter['modules.slug'] &&
              queryFilter['modules.slug'].includes(module.slug)
            "
            class=""
            :label="module.name"
            @input="checkboxFilter('modules.slug', module.slug)"
          />
        </div>
      </div>
    </template>

    <pre>{{ queryFilter }}</pre>
  </div>
</template>

<script>
export default {
  async fetch() {
    // https://vue-telemetry-api.herokuapp.com/frameworks
    // https://vue-telemetry-api.herokuapp.com/modules
    // https://vue-telemetry-api.herokuapp.com/plugins
    // https://vue-telemetry-api.herokuapp.com/uis
    // TODO: rewrite to parallel
    for (const t of ['frameworks', 'modules', 'plugins', 'uis']) {
      const technology = await this.$strapi.find(t)
      if (technology.length) {
        this[t] = technology.sort((a, b) => a.slug.localeCompare(b.slug))
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
      queryFilter: {
        // _limit: 9
      }
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
      // console.log('checkbox', value)
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
        // console.log('radio', value)
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
        this.queryFilter
        // qs.stringify(this.queryFilter, {
        //   arrayFormat: 'repeat',
        //   addQueryPrefix: true
        // })
      )
    }
  }
}
</script>

<style></style>
