<template>
  <button
    :class="[
      sizing.height,
      sizing.fontSize,
      color.bg,
      color.text,
      color.outline
    ]"
    class="font-bold-body-weight px-4 rounded-md focus:outline-none border-2 border-transparent"
  >
    <slot></slot>
  </button>
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
    }
  },
  computed: {
    sizing() {
      if (this.size === 'small') {
        return {
          height: 'h-8',
          fontSize: 'text-sm'
        }
      } else if (this.size === 'base') {
        return {
          height: 'h-10',
          fontSize: 'text-base'
        }
      } else {
        return {
          height: 'h-12',
          fontSize: 'text-eight'
        }
      }
    },
    color() {
      if (this.appearance === 'primary') {
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
      } else {
        return {
          bg: 'bg-grey-500',
          text: 'text-grey-900'
        }
      }
    }
  }
}
</script>

<style></style>
