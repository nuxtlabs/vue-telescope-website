<template>
  <div class="relative flex flex-wrap items-center px-3 min-h-6">
    <div
      class="absolute top-0 left-0 flex items-center h-10 ml-4 -mt-10 font-bold-body-weight"
    >
      <AnimatedNumber :to="totalCount" :from="0" />

      <span class="text-sm font-body-weight">&nbsp;websites found</span>
    </div>

    <transition-group name="scale" appear>
      <div
        v-for="(value, key) in selectedFilters"
        :key="key"
        class="inline-flex items-center px-2 py-1 mx-1 mt-0 mb-2 border rounded-lg scale-item bg-primary-50 text-primary-500 border-primary-100"
      >
        <div
          class="flex items-center px-2 text-sm font-bold-body-weight leading-sm"
        >
          <span class="mr-1">{{ title(key) }}</span>
          <img
            v-if="key === 'framework.slug'"
            class="inline-block w-4 h-4"
            :src="`${config.iconsURL}${
              frameworks.find((framework) => framework.slug === value).imgPath
            }`"
            alt=""
          >
          <img
            v-else-if="key === 'ui.slug'"
            class="inline-block w-4 h-4"
            :src="`${config.iconsURL}${
              uis.find((ui) => ui.slug === value).imgPath
            }`"
            alt=""
          >
          <span>{{ content({ key, value }) }}</span>
        </div>
        <button
          class="focus:outline-none has-hover:hover:opacity-75"
          @click="$emit('clear-filter', key)"
        >
          <XmarkCircleFill class="w-4 h-4 text-primary-500" />
        </button>
      </div>
      <button
        v-if="Object.entries(selectedFilters).length > 1"
        key="clear-button"
        class="inline-flex items-center px-2 py-1 mx-1 mt-0 mb-2 mr-2 border rounded-lg scale-item focus:outline-none bg-grey-50 has-hover:hover:bg-grey-100 text-grey-500 border-grey-300"
        @click="$emit('clear-filters')"
      >
        <div class="px-2 text-sm font-bold-body-weight leading-sm">
          Clear all
        </div>
        <XmarkCircleFill class="w-4 h-4 has-hover:hover:opacity-75" />
      </button>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Filters } from '~/types'

import XmarkCircleFill from '@/assets/icons/xmark-circle-fill.svg'

const { frameworks, uis } = useTechnologies().value

const config = useRuntimeConfig().public

defineProps({
  selectedFilters: {
    type: Object as PropType<Filters>,
    default: () => ({})
  },
  totalCount: {
    type: Number,
    default: 0
  }
})

function title (key) {
  if (key === 'vueVersion_gte') {
    return 'Vue 3 only'
  } else if (key === 'isStatic') {
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
  } else if (key === '_q') {
    return 'Keyword'
  }
}
function content ({ key, value }) {
  if (key === 'isStatic' || key === 'hasSSR') {
    if (value.length > 1) {
      return 'Any'
    } else if (value.length === 1 && value[0] === true) {
      return key === 'isStatic' ? 'Static' : 'Server-side'
    } else if (value.length === 1 && value[0] === false) {
      return key === 'isStatic' ? 'Server' : 'Client-side'
    }
  } else if (key === 'framework_null' || key === 'ui_null') {
    return 'Vue'
  } else if (key === 'plugins.slug' || key === 'modules.slug') {
    const validatedValue = Array.isArray(value) ? value : [value]
    if (validatedValue.length === 1) {
      return validatedValue[0]
    } else {
      return `${validatedValue[0]} + ${validatedValue.length - 1} more`
    }
  } else if (key === '_q') {
    return value
  }
}
</script>

<style scoped>
/* .scale-item {
  transition: all 10000ms cubic-bezier(0.4, 0, 0.2, 1);
} */

.scale-move,
.scale-enter-active,
.scale-leave-active {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.scale-leave-active {
  position: absolute;
}
</style>
