<template>
  <nuxt-link
    :to="{ name: 'showcases-slug', params: { slug: data.slug } }"
    tag="div"
    class="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-xl m-2"
  >
    <div class="px-4 py-5 sm:p-6">{{ data }}</div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
