<template>
  <component
    :is="tag"
    :href="href"
    :class="[
      sizing.height,
      sizing.fontSize,
      sizing.rounded,
      sizing.padding,
      color.bg,
      color.text,
      color.outline,
      color.hoverState
    ]"
    class="inline-flex justify-center items-center font-bold-body-weight focus:outline-none border-2 border-transparent transition-colors duration-200"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  size: {
    type: String,
    default: 'base',
    validator (value) {
      return ['small', 'base', 'large'].includes(value as string)
    }
  },
  appearance: {
    type: String,
    default: 'regular',
    validator (value) {
      return ['regular', 'transparent', 'primary', 'danger', 'warning', 'success', 'info', 'github'].includes(value as string)
    }
  },
  tag: {
    type: String,
    default: 'button'
  },
  href: {
    type: String,
    default: null
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
        padding: 'px-4'
      },
      large: {
        height: 'h-12',
        fontSize: 'text-eight',
        rounded: 'rounded-3lg',
        padding: 'px-6'
      }
    }[props.size])
)

const color = computed(
  () =>
    ({
      transparent: {
        bg: '',
        text: '',
        outline: '',
        hoverState: 'has-hover:hover:text-primary-500'
      },
      primary: {
        bg: 'bg-primary-500',
        text: 'text-white',
        outline: 'focus:border-primary-700',
        hoverState: 'has-hover:hover:bg-primary-400'
      },
      danger: {
        bg: 'bg-red-500',
        text: 'text-white'
      },
      warning: {
        bg: 'bg-yellow-500',
        text: 'text-grey-900'
      },
      success: {
        bg: 'bg-green-500',
        text: 'text-white'
      },
      info: {
        bg: 'bg-blue-500',
        text: 'text-white',
        outline: 'focus:border-blue-800',
        hoverState: 'has-hover:hover:bg-blue-400'
      },
      github: {
        bg: 'bg-github-base',
        text: 'text-white',
        hoverState: 'has-hover:hover:bg-grey-800'
      },
      regular: {
        bg: 'bg-grey-50 has-hover:hover:bg-grey-200',
        text: 'text-grey-800',
        outline: 'focus:border-grey-700'
      }
    }[props.appearance])
)

</script>
