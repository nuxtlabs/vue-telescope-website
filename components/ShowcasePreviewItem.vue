<template>
  <nuxt-link
    :to="{ name: 'showcases-slug', params: { slug: data.slug } }"
    class="previewItem flex flex-col cursor-pointer"
    tag="div"
  >
    <div
      class="previewItem__img rounded h-48 bg-cover bg-top bg-no-repeat shadow transition ease-in-out duration-150"
      :style="{ backgroundImage: 'url(' + data.screenshot_url + ')' }"
    ></div>
    <div class="mt-2 flex flex-col">
      <p class="text-base font-semibold text-gray-900">
        {{ data.domain }}
      </p>
      <p class="text-sm text-gray-400">
        {{ data.vue_version }}
      </p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss" scoped>
.previewItem:hover .previewItem__img {
  @apply shadow-xl;
}
</style>
