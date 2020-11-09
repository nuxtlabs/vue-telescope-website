<template>
  <div>
    <div v-for="(list, index) in lists" :key="index">
      <span class="text-white text-eight leading-eight font-display-weight">{{
        list.name
      }}</span>
      <div
        v-for="(group, groupIndex) in list.groups"
        :key="groupIndex"
        class="flex items-center"
        @click="onBookmarkClicked(list, group)"
      >
        <BulletIcon class="flex-grow-0 w-4 h-4 text-white mr-2" />
        <span class="flex-grow text-white">{{ group.name }}</span>
        <BookmarkIcon
          v-if="!group.showcases.find((it) => it.id === showcase.id)"
          class="flex-grow-0 w-5 h-5 text-white"
        />
        <UnBookmarkIcon v-else class="flex-grow-0 w-5 h-5 text-white" />
      </div>
    </div>
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
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists.filter((list) => list.groups.length)
    }
  },
  methods: {
    selectGroup(group) {
      this.$emit('group-selected', group)
    },
    onBookmarkClicked(list, group) {
      group.showcases?.find((it) => it.id === this.showcase.id)
        ? this.unbookmark(list, group)
        : this.bookmark(list, group)
    },
    async bookmark(list, group) {
      try {
        await this.$strapi.$http.$post(
          `/lists/${list.id}/groups/${group.id}/showcases`,
          {
            showcase: this.showcase
          }
        )
        const updatedGroup = {
          ...group,
          showcases: [this.showcase, ...group.showcases]
        }
        this.$store.commit('updateGroup', {
          group: updatedGroup,
          list
        })
      } catch (e) {}
    },
    async unbookmark(list, group) {
      try {
        await this.$strapi.$http.$delete(
          `/lists/${list.id}/groups/${group.id}/showcases/${this.showcase.id}`
        )
        const updatedGroup = {
          ...group,
          showcases: group.showcases.filter((it) => it.id !== this.showcase.id)
        }
        this.$store.commit('updateGroup', {
          group: updatedGroup,
          list
        })
      } catch (e) {}
    }
  }
}
</script>
