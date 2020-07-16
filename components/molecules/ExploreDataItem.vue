<template>
  <div
    class="flex flex-col items-center w-full sm:w-1/2 md:w-1/3 p-2 max-w-sm m-auto sm:m-0"
  >
    <div class="relative w-full h-full pt-0">
      <div
        class="flex flex-col items-center justify-between sm:justify-center bg-grey-50 rounded-xl p-2 pt-0 pl-0 w-full h-full border-2 border-grey-100"
      >
        <div
          style="
            border-radius: 0.75rem;
            border-bottom-left-radius: 0;
            border-top-right-radius: 0;
          "
          class="self-start bg-grey-200 px-3 rounded-xl rounded-bl-none rounded-tr-none text-xs tracking-4 uppercase leading-sm font-bold-body-weight mb-2"
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
