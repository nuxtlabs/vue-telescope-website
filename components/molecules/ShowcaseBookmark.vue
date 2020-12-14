<template>
  <div
    v-if="$strapi.user"
    class="hidden sm:block absolute top-0 left-0 w-full h-full p-2 bg-white overflow-auto"
  >
    <div
      v-for="collection in collectionsWithGroups"
      class="w-full flex flex-col"
    >
      <div>{{ collection.name }}</div>
      <div
        v-for="group in collection.groups"
        class="ml-4"
        @click.prevent="onBookmarkClicked(collection, group)"
        :class="[isBookmarked(group) && 'text-red-500']"
      >
        {{ group.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BookmarkIcon from '@/assets/icons/bookmark.svg?inline'
import UnBookmarkIcon from '@/assets/icons/bookmark-fill.svg?inline'

export default {
  components: {
    // OpenIcon,
    BookmarkIcon,
    UnBookmarkIcon
    // CancelIcon
  },
  props: {
    showcase: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      collections: (state) => state.collections.collections
    }),
    collectionsWithGroups() {
      return this.collections.filter((collection) => collection.groups.length)
    }
  },
  methods: {
    isBookmarked(group) {
      return group.showcases.find((s) => s.id === this.showcase.id)
    },
    onBookmarkClicked(collection, group) {
      group.showcases?.find((s) => s.id === this.showcase.id)
        ? this.unbookmark(collection, group)
        : this.bookmark(collection, group)
    },
    async bookmark(collection, group) {
      try {
        await this.$store.dispatch('collections/bookmarkShowcase', {
          showcase: this.showcase,
          group,
          collection
        })
      } catch (e) {}
    },
    async unbookmark(collection, group) {
      try {
        await this.$store.dispatch('collections/unbookmarkShowcase', {
          showcase: this.showcase,
          group,
          collection
        })
      } catch (e) {}
    }
  }
}
</script>
