<template>
  <div class="pointer-events-auto min-h-screen">
    <!-- <template v-if="showcase"> -->
    <header class="relative pt-14 pb-6 flex justify-between items-center">
      <div class="relative">
        <h1
          class="truncate-multiline-2 pr-4 mb-2 text-five leading-five md:text-five md:leading-five font-display-weight"
        >
          {{ showcase.siteName || showcase.title }}
        </h1>
        <div class="description">
          <p class="text-eight leading-eight">
            {{ showcase.description }}
          </p>
        </div>
        <a
          v-if="!showcase.isAdultContent"
          :href="showcase.url"
          target="_blank"
          class="h-6 absolute top-0 left-0 flex -mt-7 text-primary-300 has-hover:hover:opacity-50 font-bold-body-weight"
        >
          <LinkIcon class="w-3 mr-2" />
          <span class style="width: max-content">{{ showcase.hostname }}</span>
        </a>
      </div>

      <div
        v-if="showcase.isAdultContent"
        class="flex items-center font-display-weight text-orange-500"
      >
        <ExclamationIcon class="w-5 h-5 mr-2" />18+
      </div>
    </header>

    <div class="flex flex-wrap">
      <div class="w-full xl:w-1/2 mb-8">
        <div class="image relative rounded-xl overflow-hidden">
          <AppResponsiveCloudinaryImage
            :url="showcase.screenshotUrl"
            :pixelate="showcase.isAdultContent"
            ratio="4:3"
            sizes="100vw"
          />
          <ClientOnly>
            <ShowcaseBookmark :showcase="showcase" />
          </ClientOnly>
        </div>
      </div>

      <div class="w-full xl:w-1/2">
        <ShowcaseInfo :showcase="showcase" />
      </div>
    </div>
    <!-- </template> -->
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Showcase } from '~/types'

import ExclamationIcon from '@/assets/icons/exclamation.svg'
import LinkIcon from '@/assets/icons/link.svg'
// import CancelIcon from '@/assets/icons/xmark-circle.svg'

defineProps({
  showcase: {
    type: Object as PropType<Showcase>,
    default: null
  }
})
</script>

<style scoped lang="postcss">
.hero-image {
  padding-bottom: 56.25%;
}

.hero-image:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-image img {
  object-fit: cover;
  object-position: top;
}

.hero-info {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  width: 100%;
}

/* Styles for usage in Floating View Modal */
.floating-view header {
  @apply px-8;
}
/* .floating-view .description {
  @apply px-8;
} */

.floating-view .image {
  @apply rounded-none;
  @screen xl {
    @apply rounded-xl ml-8;
  }
}
</style>
