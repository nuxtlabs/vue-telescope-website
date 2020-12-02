<template>
  <div class="flex flex-col" :class="style.collections">
    <ul
      v-for="(collection, index) in collections"
      :key="index"
      :class="style.groups"
    >
      <p class="text-white font-display-weight" :class="style.collection">
        {{ collection.name }}
      </p>
      <li
        v-for="(group, groupIndex) in collection.groups"
        :key="groupIndex"
        class="flex items-center cursor-pointer"
        :tabindex="0"
        @keypress.enter="onBookmarkClicked(collection, group)"
        @click.prevent="onBookmarkClicked(collection, group)"
      >
        <BulletIcon class="flex-grow-0 w-4 h-4 text-white mr-2" />
        <span class="flex-grow text-white" :class="style.group">
          {{ group.name }}
        </span>
        <BookmarkIcon
          v-if="!group.showcases.find((it) => it.id === showcase.id)"
          class="flex-grow-0 text-white"
          :class="style.icon"
        />
        <UnBookmarkIcon
          v-else
          class="flex-grow-0 text-white"
          :class="style.icon"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import BulletIcon from '@/assets/icons/bullet.svg?inline'
import BookmarkIcon from '@/assets/icons/bookmark.svg?inline'
import UnBookmarkIcon from '@/assets/icons/bookmark-fill.svg?inline'

export default {
  components: {
    BulletIcon,
    BookmarkIcon,
    UnBookmarkIcon
  },
  props: {
    showcase: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  computed: {
    collections() {
      return this.$store.state.collections.collections.filter(
        (collection) => collection.groups.length
      )
    },
    style() {
      if (this.size === 'small') {
        return {
          icon: ['w-5', 'h-5'],
          collections: [],
          collection: ['text-eight', 'leading-eight'],
          groups: [],
          group: []
        }
      } else {
        return {
          icon: ['w-8', 'h-8'],
          collections: ['space-y-4'],
          collection: ['text-six', 'leading-six'],
          groups: ['space-y-2'],
          group: ['text-eight', 'leading-eight']
        }
      }
    }
  },
  methods: {
    onBookmarkClicked(collection, group) {
      group.showcases?.find((it) => it.id === this.showcase.id)
        ? this.unbookmark(collection, group)
        : this.bookmark(collection, group)
    },
    bookmark(collection, group) {
      try {
        this.$store.dispatch('collections/bookmarkShowcase', {
          showcase: this.showcase,
          group,
          collection
        })
      } catch (e) {}
    },
    unbookmark(collection, group) {
      try {
        this.$store.dispatch('collections/unbookmarkShowcase', {
          showcase: this.showcase,
          group,
          collection
        })
      } catch (e) {}
    }
  }
}
</script>
