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
            :label="value ? 'Universal' : 'Client-side'"
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
          :checked="selectedFilters['framework_null']"
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
              selectedFilters['framework.slug'] &&
              selectedFilters['framework.slug'].includes(framework.slug)
            "
            class="mb-1"
            @input="radioFilter('framework.slug', framework.slug)"
          >
            <div class="flex items-center">
              <img
                class="w-4 h-4 mr-1"
                :src="`https://icons.vuetelemetry.com${framework.imgPath}`"
                alt=""
              />
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
          :checked="selectedFilters['ui_null']"
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
              selectedFilters['ui.slug'] &&
              selectedFilters['ui.slug'].includes(ui.slug)
            "
            class="mb-1"
            @input="radioFilter('ui.slug', ui.slug)"
          >
            <div class="flex items-center">
              <img
                class="w-4 h-4 mr-1"
                :src="`https://icons.vuetelemetry.com${ui.imgPath}`"
                alt=""
              />
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
              selectedFilters['plugins.slug'] &&
              selectedFilters['plugins.slug'].includes(plugin.slug)
            "
            class="mb-1"
            :label="plugin.name"
            @input="checkboxFilter('plugins.slug', plugin.slug)"
          />
        </template>
      </div>
    </div>

    <template v-if="selectedFilters['framework.slug'] === 'nuxtjs'">
      <div class="mb-4">
        <AppFilterLabel>Modules</AppFilterLabel>
        <div class="flex flex-col">
          <template v-for="module in modules" class="">
            <AppCheckbox
              :id="`module-${module.slug}`"
              :key="module.id"
              :checked="
                selectedFilters['modules.slug'] &&
                selectedFilters['modules.slug'].includes(module.slug)
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
    <!-- <pre>{{ selectedFilters }}</pre> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // data() {
  //   return {
  //     queryFilter: {}
  //   }
  // },
  computed: {
    ...mapState({
      frameworks: (state) => state.frameworks,
      modules: (state) => state.modules,
      plugins: (state) => state.plugins,
      uis: (state) => state.uis,
      selectedFilters: (state) => state.selectedFilters
    })
  },
  methods: {
    checkboxFilter(key, value) {
      if (!this.selectedFilters[key]) {
        // init, if no key/value set
        // this.$set(this.queryFilter, key, [value])
        this.$store.commit('SET_FILTER_KEY', { key, value: [value] })
      } else if (this.selectedFilters[key].includes(value)) {
        const filteredArray = this.selectedFilters[key].filter(
          (i) => i !== value
        )
        // this.$set(this.queryFilter, key, [...filteredArray])
        this.$store.commit('SET_FILTER_KEY', { key, value: [...filteredArray] })
        if (!filteredArray.length) {
          // if array is empty - delete key
          // this.$delete(this.queryFilter, key)
          this.$store.commit('DELETE_FILTER_KEY', key)
        }
      } else {
        // this.$set(this.queryFilter, key, [...this.queryFilter[key], value])
        this.$store.commit('SET_FILTER_KEY', {
          key,
          value: [...this.selectedFilters[key], value]
        })
      }

      // this.updateFilters()
    },
    radioFilter(key, value) {
      if (this.selectedFilters[key] === value) {
        // this.$delete(this.queryFilter, key)
        this.$store.commit('DELETE_FILTER_KEY', key)
      } else {
        // this.$set(this.queryFilter, key, value)
        this.$store.commit('SET_FILTER_KEY', {
          key,
          value
        })
      }

      // cleanup NONE selection
      if (key === 'framework.slug') {
        // this.$delete(this.queryFilter, 'framework_null')
        this.$store.commit('DELETE_FILTER_KEY', 'framework_null')
      }
      if (key === 'ui.slug') {
        // this.$delete(this.queryFilter, 'ui_null')
        this.$store.commit('DELETE_FILTER_KEY', 'ui_null')
      }

      // this.updateFilters()
    },
    // updateFilters() {
    //   // this.$emit('update-filters', this.selectedFilters)
    //   // window.scrollTo(0, 0)
    // },
    selectNoFramework() {
      // this.$delete(this.queryFilter, 'framework.slug')
      this.$store.commit('DELETE_FILTER_KEY', 'framework.slug')
      // this.$set(this.queryFilter, 'framework_null', true)
      this.$store.commit('SET_FILTER_KEY', {
        key: 'framework_null',
        value: true
      })
      // this.$nextTick(() => {
      //   this.updateFilters()
      // })
    },
    selectNoUIFramework() {
      // this.$delete(this.queryFilter, 'ui.slug')
      this.$store.commit('DELETE_FILTER_KEY', 'ui.slug')
      // this.$set(this.queryFilter, 'ui_null', true)
      this.$store.commit('SET_FILTER_KEY', {
        key: 'ui_null',
        value: true
      })
      // this.$nextTick(() => {
      //   this.updateFilters()
      // })
    },
    clearFilters() {
      // this.queryFilter = {}
      // this.$router.push({ query: null })
      setTimeout(() => {
        this.$store.commit('RESET_FILTERS')
      })
      // this.updateFilters()
    },
    clearFilter(key) {
      // this.$delete(this.queryFilter, key)
      this.$store.commit('DELETE_FILTER_KEY', key)
      // this.updateFilters()
    }
  }
}
</script>

<style></style>
