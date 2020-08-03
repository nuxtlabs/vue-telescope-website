<template>
  <input
    :class="[sizing.height, sizing.fontSize, sizing.rounded, sizing.padding]"
    class="w-full border-2 bg-grey-200 hover:bg-grey-100 border-transparent font-bold-body-weight focus:border-grey-500 focus:bg-grey-50 focus:outline-none"
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
          rounded: 'rounded-lg',
          padding: 'px-2'
        }
      } else {
        return {
          height: 'h-10',
          fontSize: 'text-base',
          rounded: 'rounded-md',
          padding: 'px-2'
        }
      }
    }
  }
}
</script>

<style></style>
