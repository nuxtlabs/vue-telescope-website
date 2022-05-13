<template>
  <input
    :class="[
      sizing.height,
      sizing.fontSize,
      sizing.rounded,
      sizing.padding,
      border.size,
      border.color,
      border.focusState
    ]"
    class="w-full placeholder-grey-400 bg-grey-100 has-hover:hover:bg-grey-50 font-bold-body-weight focus:bg-grey-50 focus:outline-none transition-colors duration-200"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from '#imports'

defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  size: {
    type: String,
    default: 'base'
  },
  appearance: {
    type: String,
    default: ''
  }
})

const sizing = computed(() => {
  if (props.size.value === 'small') {
    return {
      height: 'h-8',
      fontSize: 'text-sm',
      rounded: 'rounded-md',
      padding: 'px-2'
    }
  } else if (props.size.value === 'large') {
    return {
      height: 'h-12',
      fontSize: 'text-eight',
      rounded: 'rounded-3lg',
      padding: 'px-2'
    }
  } else {
    return {
      height: 'h-10',
      fontSize: 'text-base',
      rounded: 'rounded-2lg',
      padding: 'px-2'
    }
  }
})

const border = computed(() => {
  if (props.appearance.value === 'transparent') {
    return {
      size: 'border-0',
      color: 'border-transparent',
      focusState: 'focus:border-transparent'
    }
  } else {
    return {
      size: 'border-2',
      color: 'border-transparent',
      focusState: 'focus:border-grey-300'
    }
  }
})
</script>

<style scoped>
input {
  -webkit-appearance: none;
}
</style>
