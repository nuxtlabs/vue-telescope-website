<template>
  <div class="relative px-3 flex items-center flex-wrap min-h-6">
    <div
      class="absolute top-0 left-0 -mt-10 font-bold-body-weight h-10 flex items-center ml-4"
    >
      <AnimatedNumber :to="totalCount" :from="0" />

      <span class="font-body-weight text-sm">&nbsp;websites found</span>
    </div>
    <transition-group name="scale" appear>
      <template v-for="(value, key) in selectedFilters">
        <div
          :key="key"
          class="scale-item rounded-full mx-1 mb-2 mt-0 px-2 py-1 inline-flex items-center bg-primary-50 text-primary-500 border border-primary-100"
        >
          <div
            class="font-bold-body-weight text-sm leading-sm px-2 flex items-center"
          >
            <span class="mr-1">{{ title(key) }}:</span>
            <img
              v-if="key === 'framework.slug'"
              class="w-4 h-4 inline-block"
              :src="`https://icons.vuetelemetry.com${
                frameworks.find((framework) => framework.slug === value).imgPath
              }`"
              alt=""
            />
            <img
              v-else-if="key === 'ui.slug'"
              class="w-4 h-4 inline-block"
              :src="`https://icons.vuetelemetry.com${
                uis.find((ui) => ui.slug === value).imgPath
              }`"
              alt=""
            />
            <span>{{ content({ key, value }) }}</span>
          </div>
          <button
            class="focus:outline-none hover:opacity-75"
            @click="$emit('clear-filter', key)"
          >
            <XmarkCircleFill class="w-4 h-4" />
          </button>
        </div>
      </template>
      <div key="clear-button" class="scale-item inline-flex">
        <button
          v-if="Object.entries(selectedFilters).length > 1"
          class="focus:outline-none rounded-full mx-1 mb-2 mr-2 mt-0 px-2 py-1 flex items-center bg-grey-50 hover:bg-grey-100 text-grey-500 border border-grey-300"
          @click="$emit('clear-filters')"
        >
          <div class="font-bold-body-weight text-sm leading-sm px-2">
            Clear all
          </div>
          <XmarkCircleFill class="w-4 h-4 hover:opacity-75" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XmarkCircleFill from '@/assets/icons/xmark-circle-fill.svg?inline'

export default {
  components: {
    XmarkCircleFill
  },
  props: {
    selectedFilters: {
      type: Object,
      default: () => {}
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState({
      uis: (state) => state.uis,
      frameworks: (state) => state.frameworks
    })
  },
  methods: {
    title(key) {
      if (key === 'isStatic') {
        return 'Deployment'
      } else if (key === 'hasSSR') {
        return 'Rendering'
      } else if (key === 'framework.slug' || key === 'framework_null') {
        return 'Framework'
      } else if (key === 'ui.slug' || key === 'ui_null') {
        return 'UI Framework'
      } else if (key === 'plugins.slug') {
        return 'Plugins'
      } else if (key === 'modules.slug') {
        return 'Nuxt Modules'
      }
    },
    content({ key, value }) {
      // console.log('suka', this.uis.find((ui) => ui.slug === value).imgPath)
      if (key === 'isStatic' || key === 'hasSSR') {
        if (value.length > 1) {
          return 'Any'
        } else if (value.length === 1 && value[0] === true) {
          return key === 'isStatic' ? 'Static' : 'Server-side'
        } else if (value.length === 1 && value[0] === false) {
          return key === 'isStatic' ? 'Server' : 'Client-side'
        }
      } else if (key === 'framework_null' || key === 'ui_null') {
        return 'None'
      } else if (key === 'plugins.slug' || key === 'modules.slug') {
        if (value.length === 1) {
          return value[0]
        } else {
          return `${value[0]} + ${value.length - 1} more`
        }
      }
    }
  }
}
</script>

<style scoped>
.scale-item {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.scale-leave-active {
  position: absolute;
}
</style>
