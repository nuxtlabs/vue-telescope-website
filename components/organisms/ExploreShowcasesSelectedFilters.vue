<template>
  <div class="px-3 flex flex-wrap">
    <template v-for="(value, key, i) in selectedFilters">
      <div
        :key="i"
        class="rounded-full mx-1 my-1 px-2 py-1 inline-flex items-center bg-primary-50 text-primary-500 border border-primary-500"
      >
        <div
          class="font-bold-body-weight text-sm leading-sm px-2 flex items-center"
        >
          <span class="mr-1">{{ title(key) }}:</span>
          <BrandIcon
            v-if="key === 'framework.slug' || key === 'ui.slug'"
            class="w-4 h-4 inline-block"
            :brand="value"
          />
          <span v-else>{{ content({ key, value }) }}</span>
        </div>
        <button class="focus:outline-none" @click="$emit('clear-filter', key)">
          <XmarkCircleFill class="w-4 h-4" />
        </button>
      </div>
    </template>
    <button
      v-if="Object.entries(selectedFilters).length !== 0"
      class="focus:outline-none rounded-full mx-1 my-1 px-2 py-1 inline-flex items-center bg-red-50 text-red-500 border border-red-500"
      @click="$emit('clear-filters')"
    >
      <div class="font-bold-body-weight text-sm leading-sm px-2">
        Clear all
      </div>
      <XmarkCircleFill class="w-4 h-4" />
    </button>
  </div>
</template>

<script>
import XmarkCircleFill from '@/assets/icons/xmark-circle-fill.svg?inline'

export default {
  components: {
    XmarkCircleFill
  },
  props: {
    selectedFilters: {
      type: Object,
      default: () => {}
    }
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

<style></style>
