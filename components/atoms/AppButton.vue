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
    class="inline-flex items-center font-bold-body-weight focus:outline-none border-2 border-transparent transition-colors duration-200"
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
    },
    outlined: {
      type: Boolean,
      default: false
    },
    href: {
      type: String,
      default: null
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
          rounded: 'rounded-3lg',
          padding: 'px-6'
        }
      } else {
        return {
          height: 'h-10',
          fontSize: 'text-base',
          rounded: 'rounded-2lg',
          padding: 'px-4'
        }
      }
    },
    color() {
      if (this.appearance === 'transparent') {
        return {
          bg: '',
          text: '',
          outline: '',
          hoverState: 'has-hover:hover:text-primary-500'
        }
      } else if (this.appearance === 'primary') {
        if (this.outlined) {
          return {
            // bg: 'bg-primary-500',
            text: 'text-primary-500',
            outline: 'border-primary-500',
            hoverState:
              'has-hover:hover:bg-primary-50 has-hover:hover:border-primary-300'
          }
        } else {
          return {
            bg: 'bg-primary-500',
            text: 'text-white',
            outline: 'focus:border-primary-700',
            hoverState: 'has-hover:hover:bg-primary-400'
          }
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
        if (this.outlined) {
          return {
            // bg: 'bg-blue-500',
            text: 'text-blue-900',
            outline: 'border-blue-900'
          }
        } else {
          return {
            bg: 'bg-blue-500',
            text: 'text-white',
            outline: 'focus:border-blue-800',
            hoverState: 'has-hover:hover:bg-blue-400'
          }
        }
      } else if (this.appearance === 'github') {
        return {
          bg: 'bg-github-base',
          text: 'text-white',
          hoverState: 'has-hover:hover:bg-grey-800'
        }
      } else {
        return {
          bg: 'bg-grey-50 has-hover:hover:bg-grey-200',
          text: 'text-grey-800',
          outline: 'focus:border-grey-700'
        }
      }
    }
  }
}
</script>

<style></style>
