<template>
  <div class="flex flex-wrap min-h-full items-center justify-center">
    <div
      class="text-sm leading-sm md:text-base md:leading-base my-12 text-center"
    >
      <span>No showcases found. Please</span>
      <span
        class="text-primary-500 cursor-pointer font-bold-body-weight"
        @click="$emit('clear')"
      >
        clear the filters
      </span>
    </div>
  </div>
</template>

<script>
export default {}
</script>
