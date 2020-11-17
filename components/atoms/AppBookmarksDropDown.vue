<template>
  <div class="flex flex-col" :class="style.lists">
    <ul v-for="(list, index) in lists" :key="index" :class="style.groups">
      <p class="text-white font-display-weight" :class="style.list">
        {{ list.name }}
      </p>
      <li
        v-for="(group, groupIndex) in list.groups"
        :key="groupIndex"
        class="flex items-center cursor-pointer"
        :tabindex="0"
        @keypress.enter="onBookmarkClicked(list, group)"
        @click.prevent="onBookmarkClicked(list, group)"
      >
        <BulletIcon class="flex-grow-0 w-4 h-4 text-white mr-2" />
        <span class="flex-grow text-white" :class="style.group">{{
          group.name
        }}</span>
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
    lists() {
      return this.$store.state.lists.filter((list) => list.groups.length)
    },
    style() {
      if (this.size === 'small') {
        return {
          icon: ['w-5', 'h-5'],
          lists: [],
          list: ['text-eight', 'leading-eight'],
          groups: [],
          group: []
        }
      } else {
        return {
          icon: ['w-8', 'h-8'],
          lists: ['space-y-4'],
          list: ['text-six', 'leading-six'],
          groups: ['space-y-2'],
          group: ['text-eight', 'leading-eight']
        }
      }
    }
  },
  methods: {
    onBookmarkClicked(list, group) {
      group.showcases?.find((it) => it.id === this.showcase.id)
        ? this.unbookmark(list, group)
        : this.bookmark(list, group)
    },
    bookmark(list, group) {
      try {
        this.$store.dispatch('bookmarkShowcase', {
          showcase: this.showcase,
          group,
          list
        })
      } catch (e) {}
    },
    unbookmark(list, group) {
      try {
        this.$store.dispatch('unbookmarkShowcase', {
          showcase: this.showcase,
          group,
          list
        })
      } catch (e) {}
    }
  }
}
</script>
