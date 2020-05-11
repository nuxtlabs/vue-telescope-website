<template>
  <div class="previewItem flex flex-col cursor-pointer" @click="open">
    <div
      class="previewItem__img rounded-sm h-48 bg-cover bg-top bg-no-repeat border border-gray-100 shadow transition ease-in-out duration-150"
      :style="{ backgroundImage: 'url(' + data.screenshot_url + ')' }"
    >
      <div class="flex items-center bg-gray-100 h-4 px-1">
        <div class="hidden sm:flex items-center">
          <span class="w-1 h-1 rounded-full bg-red-500"></span>
          <span class="mx-1 w-1 h-1 rounded-full bg-yellow-300"></span>
          <span class="w-1 h-1 rounded-full bg-nuxt-lightgreen"></span>
        </div>
        <div class="h-2 w-full mx-10 rounded-sm bg-white"></div>
      </div>
    </div>
    <div class="mt-2 flex items-center justify-between">
      <p
        class="previewItem__title text-base font-extrabold text-nuxt-gray transition ease-in-out duration-150"
      >
        {{ hostname }}
      </p>
      <div class="flex items-center">
        <img class="h-3 mr-px" src="/img/vuejs.svg" alt="vuejs" />
        <p class="text-xs text-gray-400">{{ data.vue_version }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    hostname () {
      return this.data.hostname.replace('www.', '')
    }
  },
  methods: {
    open () {
      this.$emit('openDrawer')
    }
  }
}
</script>

<style lang="postcss" scoped>
.previewItem:hover .previewItem__img {
  @apply shadow-xl;
}
.previewItem:hover .previewItem__title {
  @apply text-nuxt-lightgreen;
}
</style>
