<template>
  <div class="p-2">
    <NuxtLink
      event
      class="group block hover-effect relative p-3 cursor-pointer"
      :to="{
        name: 'explore-website',
        params: {
          website: showcase.slug
        }
      }"
      @click.native.prevent="open"
    >
      <div class="rounded-lg overflow-hidden mb-4 relative">
        <ResponsiveCloudinaryImage
          :url="showcase.screenshotUrl"
          ratio="4:3"
          sizes="(min-width: 834px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <BookmarkShowcase
          :showcase="showcase"
          compact
          :sortable="sortable"
          class="hidden transition-opacity sm:block duration-400"
        />
      </div>
      <div class="flex flex-wrap items-center">
        <div
          class="flex items-center justify-between w-full font-display-weight text-eight leading-eight"
        >
          <span class="truncate">
            {{ showcase.hostname }}
          </span>
          <div class="h-full inline-flex items-center ml-2">
            <img
              v-if="showcase.ui"
              class="inline-block w-4 h-4 mr-1"
              :src="`${$config.iconsURL}${showcase.ui.imgPath}`"
              alt=""
            />
            <img
              v-if="!showcase.framework"
              class="inline-block w-4 h-4 mr-1"
              :src="`${$config.iconsURL}/vue.svg`"
              alt=""
            />
            <img
              v-if="showcase.framework"
              class="inline-block w-4 h-4 mr-1"
              :src="`${$config.iconsURL}${showcase.framework.imgPath}`"
              alt=""
            />
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    showcase: {
      type: Object,
      default: () => {}
    },
    sortable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    open(e) {
      this.$emit('open-link')
    }
  }
}
</script>

<style scoped>
.hover-effect:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: theme('colors.grey.100');
  border-radius: theme('borderRadius.xl');
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 300ms, transform 300ms;
}

@media (hover: hover) {
  .hover-effect:hover:before {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
