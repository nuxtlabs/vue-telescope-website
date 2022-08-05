<template>
  <input
    :class="[
      sizing.height,
      sizing.fontSize,
      sizing.rounded,
      sizing.padding,
    ]"
    class="appearance-none border-2 border-transparent focus:border-grey-300 w-full placeholder-grey-400 bg-grey-100 has-hover:hover:bg-grey-50 font-bold-body-weight focus:bg-grey-50 focus:outline-none transition-colors duration-200"
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
  >
</template>

<script setup lang="ts">
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
    default: 'base',
    validator (value) {
      return ['small', 'base', 'large'].includes(value as string)
    }
  }
})

const sizing = computed(
  () =>
    ({
      small: {
        height: 'h-8',
        fontSize: 'text-sm',
        rounded: 'rounded-md',
        padding: 'px-2'
      },
      base: {
        height: 'h-10',
        fontSize: 'text-base',
        rounded: 'rounded-2lg',
        padding: 'px-2'
      },
      large: {
        height: 'h-12',
        fontSize: 'text-eight',
        rounded: 'rounded-3lg',
        padding: 'px-2'
      }
    }[props.size])
)
</script>
