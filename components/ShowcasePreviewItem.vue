<template>
  <div class="previewItem flex flex-col cursor-pointer" @click="open">
    <div
      class="previewItem__img rounded-sm shadow transition ease-in-out duration-150"
    >
      <div class="flex items-center bg-gray-100 h-4 px-1">
        <div class="hidden sm:flex items-center">
          <span class="w-1 h-1 rounded-full bg-red-500"></span>
          <span class="mx-1 w-1 h-1 rounded-full bg-yellow-300"></span>
          <span class="w-1 h-1 rounded-full bg-nuxt-lightgreen"></span>
        </div>
        <div class="h-2 w-full mx-10 rounded-sm bg-white"></div>
      </div>
      <div
        class="h-48 md:h-40 bg-cover bg-top bg-no-repeat border border-gray-100"
        :style="{ backgroundImage: 'url(' + screenshotUrl + ')' }"
      ></div>
    </div>
    <div class="mt-2 flex items-center justify-between">
      <p
        class="previewItem__title text-base font-extrabold text-nuxt-gray truncate transition ease-in-out duration-150"
      >
        {{ hostname }}
      </p>
      <div class="flex items-center">
        <img
          v-if="data.framework && data.framework.img_path"
          :src="iconUrl(data.framework.img_path)"
          :alt="data.framework.name"
          class="w-3 h-3 mx-2"
        />
        <img v-else class="h-3 mr-2" src="/img/vuejs.svg" alt="vuejs" />
        <img
          v-if="data.ui && data.ui.img_path"
          :src="iconUrl(data.ui.img_path)"
          :alt="data.ui.name"
          class="w-3 h-3"
        />
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
    hostname() {
      return this.data.hostname.replace('www.', '')
    },
    screenshotUrl() {
      return this.data.screenshot_url.replace(
        '/upload/',
        '/upload/c_scale,w_260/'
      )
    }
  },
  methods: {
    open() {
      this.$emit('openDrawer')
    },
    iconUrl(path) {
      return `${process.env.ICONS_URL}${path}`
    }
  }
}
</script>

<style lang="postcss" scoped></style>
