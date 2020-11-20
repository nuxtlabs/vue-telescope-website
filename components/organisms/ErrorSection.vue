<template>
  <div class="flex-1 flex flex-col items-center justify-center">
    <img src="/404.svg" />

    <h2 class="text-grey-900 text-six leading-six font-display-weight mb-4">
      {{ error.message }}
    </h2>

    <NuxtLink
      :to="{ name: 'index' }"
      class="block text-primary-500 hover:underline hover:opacity-75 font-bold-body-weight"
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
  // mounted() {
  //   this.$gsap.fromTo(
  //     document.getElementById('floating-items').children,
  //     {
  //       opacity: 0,
  //       x: 0
  //     },
  //     {
  //       opacity: 1,
  //       x: 100,
  //       repeat: -1
  //     }
  //   )
  // }
}
</script>

<style></style>
