<template>
  <div class="pointer-events-auto min-h-screen">
    <div
      v-if="!website"
      class="w-full h-full flex items-center justify-center pt-12 text-seven font-display-weight"
    >
      LOADING!!!
    </div>
    <template v-else>
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
            <span class style="width: max-content">{{ website.hostname }}</span>
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
          <div class="image relative rounded-xl overflow-hidden shadow">
            <ResponsiveCloudinaryImage
              :url="website.screenshotUrl"
              :pixelate="website.isAdultContent"
              ratio="4:3"
              sizes="100vw"
              class=""
            />
            <ClientOnly>
              <div
                v-if="$strapi.user && !isBookmarking"
                class="absolute top-0 right-0"
              >
                <div
                  class="flex items-top justify-items-right p-2 cursor-pointer bg-grey-900 bg-opacity-50"
                  @click="isBookmarking = true"
                >
                  <BookmarkIcon
                    v-if="!isBookmarked"
                    class="flex-1 w-6 h-6 text-white"
                  />
                  <UnBookmarkIcon v-else class="flex-1 w-6 h-6 text-white" />
                </div>
              </div>
              <div
                v-else-if="$strapi.user && isBookmarking"
                class="flex absolute top-0 w-full h-full bg-grey-900 bg-opacity-75"
                @mouseleave="isBookmarking = false"
              >
                <div class="flex flex-col items-end w-full p-4 overflow-y-auto">
                  <AppBookmarksDropDown
                    :showcase="website"
                    :size="bookmarksDropDownSize"
                    class="flex-grow w-full"
                  />
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>

        <div class="w-full xl:w-1/2">
          <WebsiteInfo :website="website" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ExclamationIcon from '@/assets/icons/exclamation.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'
import BookmarkIcon from '@/assets/icons/bookmark.svg?inline'
import UnBookmarkIcon from '@/assets/icons/bookmark-fill.svg?inline'
// import CancelIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  components: {
    ExclamationIcon,
    LinkIcon,
    BookmarkIcon,
    UnBookmarkIcon
    // CancelIcon
  },
  props: {
    website: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isBookmarking: false,
      pending: false
    }
  },
  computed: {
    isBookmarked() {
      const showcases = this.$store.state.lists
        .flatMap((list) => list.groups)
        .flatMap((group) => group.showcases)
      return showcases?.find((it) => it && it.id === this.website.id)
    },
    bookmarksDropDownSize() {
      return this.$mq === 'sm' ? 'small' : ''
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
