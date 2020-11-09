<template>
  <div class="p-2">
    <div
      class="hover-effect relative p-3"
      :class="!$strapi.user ? ['cursor-pointer'] : []"
      @click="!$strapi.user ? open() : () => {}"
    >
      <div class="rounded-lg overflow-hidden mb-4 relative">
        <AppResponsiveCloudinaryImage
          :url="showcase.screenshotUrl"
          ratio="4:3"
          sizes="(min-width: 834px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div
          v-if="$strapi.user"
          class="flex absolute top-0 w-full h-full cursor-pointer bg-grey-900 bg-opacity-75 opacity-0 hover:opacity-100"
        >
          <div v-if="!isBookmarking" class="flex w-full h-full">
            <div
              class="flex flex-1 items-center justify-items-center text-center h-full opacity-50 hover:opacity-100"
              @click="open"
            >
              <OpenIcon class="flex-1 w-8 h-8 text-white" />
            </div>
            <div
              class="flex flex-1 items-center justify-items-center text-center h-full opacity-50 hover:opacity-100"
              @click="isBookmarking = true"
            >
              <BookmarkIcon
                v-if="!isBookmarked"
                class="flex-1 w-8 h-8 text-white"
              />
              <UnBookmarkIcon v-else class="flex-1 w-8 h-8 text-white" />
            </div>
          </div>
          <div
            v-else
            class="flex flex-col items-center w-full p-2 overflow-y-auto"
          >
            <CancelIcon
              class="flex-shrink-0 w-8 h-8 text-white mb-2"
              @click="isBookmarking = false"
            />
            <AppBookmarksDropDown
              :showcase="showcase"
              class="flex-grow w-full"
            />
          </div>
        </div>
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
              :src="`https://icons.vuetelemetry.com${showcase.ui.imgPath}`"
              alt=""
            />
            <img
              v-if="!showcase.framework"
              class="inline-block w-4 h-4 mr-1"
              :src="`https://icons.vuetelemetry.com/vue.svg`"
              alt=""
            />
            <img
              v-if="showcase.framework"
              class="inline-block w-4 h-4 mr-1"
              :src="`https://icons.vuetelemetry.com${showcase.framework.imgPath}`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenIcon from '@/assets/icons/eye.svg?inline'
import BookmarkIcon from '@/assets/icons/bookmark.svg?inline'
import UnBookmarkIcon from '@/assets/icons/bookmark-fill.svg?inline'
import CancelIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  components: {
    OpenIcon,
    BookmarkIcon,
    UnBookmarkIcon,
    CancelIcon
  },
  props: {
    showcase: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isBookmarking: false
    }
  },
  computed: {
    isBookmarked() {
      const showcases = this.$store.state.lists
        .flatMap((list) => list.groups)
        .flatMap((group) => group.showcases)
      return showcases?.find((it) => it && it.id === this.showcase.id)
    }
  },
  methods: {
    open() {
      this.$store.commit('SET_MODAL', true)
      this.$router.push({
        name: 'explore-website',
        params: { website: this.showcase.slug }
      })
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
