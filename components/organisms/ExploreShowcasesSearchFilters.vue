<template>
  <div class="px-2">
    <!-- <div class="mb-4">
      <AppFilterLabel>Rendering</AppFilterLabel>
      <div class="flex flex-col">
        <template v-for="(value, i) in [true, false]" class="">
          <AppCheckbox
            :id="`ssr-${value}`"
            :key="i"
            :checked="
              queryFilter['hasSSR'] && queryFilter['hasSSR'].includes(value)
            "
            class="mb-1"
            :label="value ? 'Server-side' : 'Client-side'"
            @input="checkboxFilter('hasSSR', value)"
          />
        </template>
      </div>
    </div> -->

    <!-- <div class="mb-4">
      <AppFilterLabel>Deployment</AppFilterLabel>
      <div class="flex flex-col">
        <template v-for="(value, i) in [true, false]" class="">
          <AppCheckbox
            :id="`static-${value}`"
            :key="i"
            :checked="
              queryFilter['isStatic'] && queryFilter['isStatic'].includes(value)
            "
            class="mb-1"
            :label="value ? 'Static' : 'Server'"
            @input="checkboxFilter('isStatic', value)"
          />
        </template>
      </div>
    </div> -->

    <div class="mb-4">
      <AppFilterLabel>Framework</AppFilterLabel>
      <div class="flex flex-col">
        <AppRadio
          :id="`framework-null`"
          :checked="queryFilter['framework_null']"
          class="mb-1"
          @input="selectNoFramework"
        >
          <span>None</span>
        </AppRadio>
        <template v-for="framework in frameworks" class="">
          <AppRadio
            :id="`framework-${framework.slug}`"
            :key="framework.id"
            :checked="
              queryFilter['framework.slug'] &&
              queryFilter['framework.slug'].includes(framework.slug)
            "
            class="mb-1"
            @input="radioFilter('framework.slug', framework.slug)"
          >
            <div class="flex items-center">
              <BrandIcon class="w-4 h-4 mr-1" :brand="framework.slug" />
              <span>{{ framework.name }}</span>
            </div>
          </AppRadio>
        </template>
      </div>
    </div>

    <div class="mb-4">
      <AppFilterLabel>UI Framework</AppFilterLabel>
      <div class="flex flex-col">
        <AppRadio
          :id="`ui-null`"
          :checked="queryFilter['ui_null']"
          class="mb-1"
          @input="selectNoUIFramework"
        >
          <span>None</span>
        </AppRadio>
        <template v-for="ui in uis" class="">
          <AppRadio
            :id="`ui-${ui.slug}`"
            :key="ui.id"
            :checked="
              queryFilter['ui.slug'] && queryFilter['ui.slug'].includes(ui.slug)
            "
            class="mb-1"
            @input="radioFilter('ui.slug', ui.slug)"
          >
            <div class="flex items-center">
              <BrandIcon class="w-4 h-4 mr-1" :brand="ui.slug" />
              <span>{{ ui.name }}</span>
            </div>
          </AppRadio>
        </template>
      </div>
    </div>

    <div class="mb-4">
      <AppFilterLabel>Plugins</AppFilterLabel>
      <div class="flex flex-col">
        <template v-for="plugin in plugins" class="">
          <AppCheckbox
            :id="`plugin-${plugin.slug}`"
            :key="plugin.id"
            :checked="
              queryFilter['plugins.slug'] &&
              queryFilter['plugins.slug'].includes(plugin.slug)
            "
            class="mb-1"
            :label="plugin.name"
            @input="checkboxFilter('plugins.slug', plugin.slug)"
          />
        </template>
      </div>
    </div>

    <template v-if="queryFilter['framework.slug'] === 'nuxtjs'">
      <div class="mb-4">
        <AppFilterLabel>Modules</AppFilterLabel>
        <div class="flex flex-col">
          <template v-for="module in modules" class="">
            <AppCheckbox
              :id="`module-${module.slug}`"
              :key="module.id"
              :checked="
                queryFilter['modules.slug'] &&
                queryFilter['modules.slug'].includes(module.slug)
              "
              class="mb-1"
              :label="module.name"
              @input="checkboxFilter('modules.slug', module.slug)"
            />
          </template>
        </div>
      </div>
    </template>

    <!-- <pre>{{ queryFilter }}</pre> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch() {
    // https://vue-telemetry-api.herokuapp.com/frameworks
    // https://vue-telemetry-api.herokuapp.com/modules
    // https://vue-telemetry-api.herokuapp.com/plugins
    // https://vue-telemetry-api.herokuapp.com/uis
    // TODO: rewrite to parallel OR unite endpoint calls
    // for (const t of ['frameworks', 'modules', 'plugins', 'uis']) {
    //   const technology = await this.$strapi.find(t)
    //   if (technology.length) {
    //     this[t] = technology.sort((a, b) => a.slug.localeCompare(b.slug))
    //   } else {
    //     // set status code on server
    //     if (process.server) {
    //       this.$nuxt.context.res.statusCode = 404
    //     }
    //     throw new Error('Thing not found')
    //   }
    // }
  },
  data() {
    return {
      // frameworks: null,
      // modules: null,
      // plugins: null,
      // uis: null,
      queryFilter: {}
    }
  },
  computed: {
    ...mapState({
      frameworks: (state) => state.frameworks,
      modules: (state) => state.modules,
      plugins: (state) => state.plugins,
      uis: (state) => state.uis
    })
  },
  methods: {
    checkboxFilter(key, value) {
      if (!this.queryFilter[key]) {
        // init, if no key/value set
        this.$set(this.queryFilter, key, [value])
      } else if (this.queryFilter[key].includes(value)) {
        const filteredArray = this.queryFilter[key].filter((i) => i !== value)
        this.$set(this.queryFilter, key, [...filteredArray])
        if (!filteredArray.length) {
          // if array is empty - delete key
          this.$delete(this.queryFilter, key)
        }
      } else {
        this.$set(this.queryFilter, key, [...this.queryFilter[key], value])
      }

      // this.$set(
      //   this.queryFilter,
      //   key,
      //   this.queryFilter[key]
      //     ? this.queryFilter[key].includes(value)
      //       ? [...this.queryFilter[key].filter((i) => i !== value)]
      //       : [...this.queryFilter[key], value]
      //     : [value]
      // )

      this.updateFilters()
    },
    radioFilter(key, value) {
      if (this.queryFilter[key] === value) {
        this.$delete(this.queryFilter, key)
      } else {
        this.$set(this.queryFilter, key, value)
      }

      // cleanup NONE selection
      if (key === 'framework.slug') {
        this.$delete(this.queryFilter, 'framework_null')
      }
      if (key === 'ui.slug') {
        this.$delete(this.queryFilter, 'ui_null')
      }

      this.updateFilters()
    },
    updateFilters() {
      this.$emit('update-filters', this.queryFilter)
      window.scrollTo(0, 0)
    },
    selectNoFramework() {
      this.$delete(this.queryFilter, 'framework.slug')
      this.$set(this.queryFilter, 'framework_null', true)
      this.$nextTick(() => {
        this.updateFilters()
      })
    },
    selectNoUIFramework() {
      this.$delete(this.queryFilter, 'ui.slug')
      this.$set(this.queryFilter, 'ui_null', true)
      this.$nextTick(() => {
        this.updateFilters()
      })
    },
    clearFilters() {
      this.queryFilter = {}
      this.updateFilters()
    },
    clearFilter(key) {
      this.$delete(this.queryFilter, key)
      this.updateFilters()
    }
  }
}
</script>

<style></style>
