<template>
  <input
    :class="[sizing.height, sizing.fontSize]"
    class="border-2 bg-grey-200 border-transparent rounded-md px-4 font-bold-body-weight focus:border-grey-500 focus:outline-none"
    type="text"
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
      } else if (this.size === 'large') {
        return {
          height: 'h-12',
          fontSize: 'text-eight'
        }
      } else {
        return {
          height: 'h-10',
          fontSize: 'text-base'
        }
      }
    }
  }
}
</script>

<style></style>
