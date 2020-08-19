<template>
  <div v-if="website" class="pointer-events-auto">
    <header class="relative pt-14 pb-6 flex justify-between items-center">
      <div class="relative">
        <h1
          class="truncate-multiline-2 pr-4 mb-2 text-five leading-five md:text-five md:leading-five font-display-weight"
        >
          {{ website.siteName || website.title }}
        </h1>
        <div class="description">
          <p class="text-eight leading-eight">{{ website.description }}</p>
        </div>
        <a
          v-if="!website.isAdultContent"
          :href="website.url"
          target="_blank"
          class="h-6 absolute top-0 left-0 flex -mt-7 text-primary-300 hover:opacity-50 font-bold-body-weight"
        >
          <LinkIcon class="w-3 mr-2" />
          <span class style="width: max-content;">{{ website.hostname }}</span>
        </a>
      </div>

      <div
        v-if="website.isAdultContent"
        class="flex items-center font-display-weight text-orange-500"
      >
        <ExclamationIcon class="w-5 h-5 mr-2" />18+
      </div>
    </header>

    <div class="flex flex-wrap">
      <div class="w-full xl:w-1/2 mb-8">
        <div class="image relative rounded-xl overflow-hidden">
          <AppResponsiveCloudinaryImage
            :url="website.screenshotUrl"
            :pixelate="website.isAdultContent"
            ratio="4:3"
            sizes="100vw"
            class="absolute top-0 left-0 w-full"
          />
        </div>
      </div>

      <div class="w-full xl:w-1/2">
        <WebsiteInfo :website="website" />
      </div>
    </div>
  </div>
</template>

<script>
import ExclamationIcon from '@/assets/icons/exclamation.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'

export default {
  components: {
    ExclamationIcon,
    LinkIcon
  },
  props: {
    website: {
      type: Object,
      default: () => {}
    }
  }
}
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

.twitter-like header {
  @apply px-8;
}
/* .twitter-like .description {
  @apply px-8;
} */

.twitter-like .image {
  @apply rounded-none;
  @screen xl {
    @apply rounded-xl ml-8;
  }
}
</style>
