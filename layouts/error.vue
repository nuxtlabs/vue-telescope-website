<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <p class="text-nuxt-lightgreen text-7xl leading-none font-black">{{ error.statusCode }}</p>
    <h1 class="text-nuxt-gray text-3xl font-extrabold">{{ error.message }}</h1>
    <NuxtLink
      :to="{ name: 'index' }"
      class="block mt-8 underline hover:text-nuxt-lightgreen transition ease-linear duration-150"
    >
      Back to the home page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
