<template>
  <div class="flex flex-col items-center w-full sm:w-1/2 md:w-1/3">
    <div class="w-full h-full p-2 pt-0">
      <div
        class="flex items-center justify-between sm:justify-center bg-grey-50 rounded-xl p-4 w-full h-full"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
