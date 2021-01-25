<template>
  <div v-if="$strapi.user && !isBookmarking" class="absolute top-0 right-0">
    <div
      class="flex items-top justify-items-right p-2 cursor-pointer bg-grey-900 bg-opacity-50"
      @click="isBookmarking = true"
    >
      <BookmarkIcon v-if="!isBookmarked" class="flex-1 w-6 h-6 text-white" />
      <UnBookmarkIcon v-else class="flex-1 w-6 h-6 text-white" />
    </div>
  </div>
  <div
    v-else-if="$strapi.user && isBookmarking"
    class="flex absolute top-0 w-full h-full bg-grey-900 bg-opacity-75"
    @mouseleave="isBookmarking = false"
  >
    <div class="flex flex-col items-end w-full p-4 overflow-y-auto">
      <AppBookmarksDropdown
        :showcase="website"
        :size="bookmarksDropDownSize"
        class="flex-grow w-full"
      />
    </div>
  </div>
</template>

<script>
import BookmarkIcon from '@/assets/icons/bookmark.svg?inline'
import UnBookmarkIcon from '@/assets/icons/bookmark-fill.svg?inline'

export default {
  components: {
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
      const showcases = this.$store.state.collections.collections
        .flatMap((collection) => collection.groups)
        .flatMap((group) => group.showcases)
      return showcases?.find((it) => it && it.id === this.website.id)
    },
    bookmarksDropDownSize() {
      return this.$mq === 'sm' ? 'small' : ''
    }
  }
}
</script>
