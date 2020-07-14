<template>
  <div class="p-2">
    <div
      class="hover-effect relative cursor-pointer p-3"
      @click="
        $router.push({
          name: 'explore-website',
          params: { website: showcase.slug }
        })
      "
    >
      <div class="rounded-lg overflow-hidden mb-4">
        <AppResponsiveCloudinaryImage
          :src="showcase.screenshotUrl"
          ratio="4:3"
          sizes="(min-width: 834px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div class="flex flex-wrap items-center">
        <NuxtLink
          class="font-display-weight text-eight leading-eight truncate-multiline-3 mr-2"
          :to="{
            name: 'explore-website',
            params: { website: showcase.slug }
          }"
        >
          {{ showcase.siteName || showcase.hostname }}
        </NuxtLink>
        <BrandIcon
          v-if="showcase.framework"
          :brand="showcase.framework.slug"
          class="w-4 h-4 mr-1"
        />
        <BrandIcon
          v-if="showcase.ui"
          :brand="showcase.ui.slug"
          class="w-4 h-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showcase: {
      type: Object,
      default: () => {}
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

.hover-effect:hover:before {
  opacity: 1;
  transform: scale(1);
}
</style>
