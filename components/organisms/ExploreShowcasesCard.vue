<template>
  <div class="p-2">
    <NuxtLink
      class="block hover-effect relative p-3 cursor-pointer"
      :to="{
        name: 'explore-website',
        params: { website: showcase.slug }
      }"
      @click.prevent="open()"
    >
      <div class="rounded-lg overflow-hidden mb-4 relative">
        <AppResponsiveCloudinaryImage
          :url="showcase.screenshotUrl"
          ratio="4:3"
          sizes="(min-width: 834px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div
          v-if="$strapi.user"
          class="hidden sm:flex absolute top-0 w-full h-full opacity-0 hover:opacity-100"
          @mouseleave="isBookmarking = false"
        >
          <div
            v-if="!isBookmarking"
            class="absolute top-0 right-0 cursor-pointer"
          >
            <div
              class="flex items-top justify-items-right p-2 cursor-pointer bg-grey-900 bg-opacity-50"
              @click.prevent="isBookmarking = true"
            >
              <BookmarkIcon
                v-if="!isBookmarked"
                class="flex-1 w-6 h-6 text-white"
              />
              <UnBookmarkIcon v-else class="flex-1 w-6 h-6 text-white" />
            </div>
          </div>
          <div
            v-else
            class="flex flex-col items-center w-full p-2 overflow-y-auto cursor-auto bg-grey-900 bg-opacity-75"
            @click.prevent=""
          >
            <AppBookmarksDropDown
              :showcase="showcase"
              size="small"
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
    </NuxtLink>
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
