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
    class="w-full placeholder-grey-400 bg-grey-100 hover:bg-grey-50 font-bold-body-weight focus:bg-grey-50 focus:outline-none transition-colors duration-200"
    :type="type"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: {
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
    },
    border() {
      if (this.appearance === 'transparent') {
        return {
          size: 'border-0',
          color: 'border-transparent',
          focusState: 'focus:border-transparent'
        }
      } else {
        return {
          size: 'border-2',
          color: 'border-transparent',
          focusState: 'focus:border-grey-500'
        }
      }
    }
  }
}
</script>

<style></style>
