<template>
  <div
    class="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 p-2 max-w-sm m-auto"
  >
    <div class="relative w-full h-full pt-0">
      <div
        class="flex flex-col items-center justify-between sm:justify-center bg-grey-50 rounded-xl p-2 w-full h-full border-2 border-grey-100"
      >
        <div
          class="self-start bg-grey-200 px-3 rounded-full text-xs tracking-4 uppercase leading-sm font-bold-body-weight mb-1"
        >
          {{ label }}
        </div>
        <div class="flex items-center">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
