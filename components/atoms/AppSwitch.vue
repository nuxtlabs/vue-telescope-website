<template>
  <button
    class="flex items-center focus:outline-none w-10 rounded-full transition-colors duration-200 h-4"
    aria-label=""
    :class="[value ? 'bg-primary-500' : 'bg-grey-50']"
    @click="processSelection"
  >
    <span
      class="flex w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
      :class="[value && ' transform translate-x-full']"
    ></span>
  </button>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    processSelection() {
      console.log(this.value)
      this.$emit('input', !this.value)
    }
  }
}
</script>
