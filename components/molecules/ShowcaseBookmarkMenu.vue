<template>
  <div
    v-if="$strapi.user"
    class="hidden sm:block absolute top-0 left-0 w-full h-full p-2 bg-white overflow-auto"
  >
    <ul>
      <li
        v-for="collection in collectionsWithGroups"
        class="root w-full flex flex-col mb-2"
      >
        <div class="flex items-center mb-2">
          <OpenedFolderIcon class="w-4 h-4 mr-2" />
          <span
            class="font-bold-body-weight"
            :class="[isBookmarkedCollection(collection) && 'text-primary-500']"
          >
            {{ collection.name }}
          </span>
        </div>
        <ul>
          <li
            v-for="group in collection.groups"
            class="flex items-center"
            @click.stop.prevent="onBookmarkClicked(collection, group)"
            :class="[isBookmarked(group) && 'text-primary-500']"
          >
            <!-- <UnorderedListIcon class="w-4 h-4 mr-2" /> -->
            <span>{{ group.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OpenedFolderIcon from '@/assets/icons/opened-folder.svg?inline'
import UnorderedListIcon from '@/assets/icons/unordered-list.svg?inline'

export default {
  components: {
    OpenedFolderIcon,
    UnorderedListIcon
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
    isBookmarkedCollection(collection) {
      return Boolean(
        collection.groups.map((g) => this.isBookmarked(g)).filter(Boolean)
          .length
      )
    },
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

<style scoped>
ul ul {
  margin: 0px 0px 0px 1.5rem;
  list-style: none;
  /*line-height: 2em;*/
  /*font-family: Arial;*/
}
ul li {
  /*font-size: 16px;*/
  position: relative;
}
ul li:before {
  position: absolute;
  left: -1rem;
  top: 0%;
  content: '';
  display: block;
  border-left: 1px solid #ddd;
  height: 50%;
  border-bottom: 1px solid #ddd;
  width: 10px;
}
ul li:after {
  position: absolute;
  left: -1rem;
  bottom: -7px;
  content: '';
  display: block;
  border-left: 1px solid #ddd;
  height: 100%;
}
/*ul li.root {
  margin: 0px 0px 0px -1rem;
}*/
ul li.root:before {
  display: none;
}
ul li.root:after {
  display: none;
}
ul li:last-child:after {
  display: none;
}
</style>
