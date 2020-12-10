<template>
  <div class="flex flex-grow items-center">
    <SectionExpandedIcon
      v-if="selected"
      class="w-4 h-4 opacity-50 hover:opacity-100 mr-2"
    />
    <SectionCollapsedIcon
      v-else
      class="w-4 h-4 opacity-50 hover:opacity-100 mr-2"
    />
    <span
      class="text-eight leading-eight font-display-weight"
      :class="selected ? 'text-primary-500' : 'text-grey-800'"
      @dblclick="$emit('update')"
    >
      {{ name }}
    </span>
  </div>
</template>

<script>
import SectionCollapsedIcon from '@/assets/icons/chevron-right.svg?inline'
import SectionExpandedIcon from '@/assets/icons/chevron-down.svg?inline'

export default {
  components: {
    SectionCollapsedIcon,
    SectionExpandedIcon
  },
  props: {
    name: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
