<template>
  <component
    :is="tag"
    :class="[
      sizing.height,
      sizing.fontSize,
      sizing.rounded,
      sizing.padding,
      color.bg,
      color.text,
      color.outline
    ]"
    class="inline-flex items-center font-bold-body-weight focus:outline-none border-2 border-transparent"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'base'
    },
    appearance: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    sizing() {
      if (this.size === 'small') {
        return {
          height: 'h-8',
          fontSize: 'text-sm',
          rounded: 'rounded-md',
          padding: 'px-2'
        }
      } else if (this.size === 'large') {
        return {
          height: 'h-12',
          fontSize: 'text-eight',
          rounded: 'rounded-lg',
          padding: 'px-4'
        }
      } else {
        return {
          height: 'h-10',
          fontSize: 'text-base',
          rounded: 'rounded-md',
          padding: 'px-2'
        }
      }
    },
    color() {
      if (this.appearance === 'transparent') {
        return {
          bg: '',
          text: '',
          outline: ''
        }
      } else if (this.appearance === 'primary') {
        return {
          bg: 'bg-primary-500',
          text: 'text-white',
          outline: 'focus:border-primary-700'
        }
      } else if (this.appearance === 'danger') {
        return {
          bg: 'bg-red-500',
          text: 'text-white'
        }
      } else if (this.appearance === 'warning') {
        return {
          bg: 'bg-yellow-500',
          text: 'text-grey-900'
        }
      } else if (this.appearance === 'success') {
        return {
          bg: 'bg-green-500',
          text: 'text-white'
        }
      } else if (this.appearance === 'info') {
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          outline: 'focus:border-blue-900'
        }
      } else {
        return {
          bg: 'bg-grey-200',
          text: 'text-grey-900',
          outline: 'focus:border-grey-700'
        }
      }
    }
  }
}
</script>

<style></style>
