<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <img src="/404.svg" class="md:max-w-[75vw]">

    <h2 class="text-grey-900 text-six leading-six font-display-weight mb-4">
      {{ error.message }}
    </h2>

    <NuxtLink
      :to="{ name: 'index' }"
      class="block text-primary-500 has-hover:hover:underline has-hover:hover:opacity-75 font-bold-body-weight"
    >
      Back to the home page
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    default: () => ({})
  }
})
</script>
