<template>
  <nuxt-link
    :to="{ name: 'showcases-slug', params: { slug: data.slug } }"
    class="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer"
    tag="div"
  >
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="data.screenshot_url" alt="" />
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p class="text-sm leading-5 font-medium text-indigo-600">
          <span class="hover:underline">
            category
          </span>
        </p>
        <div class="block">
          <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
            {{ data.domain }}
          </h3>
          <p class="mt-3 text-base leading-6 text-gray-500">
            {{ data.vue_version }}
          </p>
        </div>
      </div>
    </div>
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
