<template>
  <div
    class="item__container cursor-pointer shadow hover:shadow-xl transition ease-in-out duration-150"
  >
    <div
      class="relative rounded h-56 bg-cover bg-top bg-no-repeat overflow-hidden"
      :style="{ backgroundImage: 'url(' + data.screenshot_url + ')' }"
    >
      <div
        class="item__mask absolute inset-0 flex flex-col justify-center items-center bg-nuxt-gray"
      >
        <p class="text-xl text-white font-extrabold">
          {{ data.domain }}
        </p>
        <p class="text-xs text-white font-medium">
          vue version : {{ data.vue_version }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturedItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss">
.item__mask {
  transition: opacity ease-in 150ms;
  @apply opacity-0;
}
.item__container:hover .item__mask {
  @apply opacity-75;
}
</style>
