<template>
  <div
    v-if="$strapi.user"
    @click.stop.prevent
    class="absolute top-0 left-0 w-full h-full bg-white overflow-auto cursor-default"
    :class="compact ? 'p-3' : 'p-8'"
  >
    <div v-if="collectionsWithGroups.length">
      <div
        class="font-bold-body-weight"
        :class="[compact ? 'mb-1' : 'text-six leading-six mb-4']"
      >
        Your Lists:
      </div>
      <ul>
        <li
          v-for="collection in collectionsWithGroups"
          :key="collection.id"
          class="root w-full flex flex-col mb-2"
        >
          <div class="flex items-center mb-1">
            <OpenedFolderIcon
              class="mr-2 mt-1"
              :class="[
                compact ? 'w-4 h-4' : 'w-6 h-6',
                isBookmarkedCollection(collection) && 'text-primary-500'
              ]"
            />
            <span
              class="font-bold-body-weight"
              :class="[
                isBookmarkedCollection(collection) && 'text-primary-500',
                compact ? '' : 'text-six leading-six'
              ]"
            >
              {{ collection.name }}
            </span>
          </div>
          <ul>
            <li v-for="group in collection.groups" :key="group.id">
              <button
                class="focus:outline-none w-full text-left"
                :class="[
                  isBookmarked(group)
                    ? 'text-primary-500 hover:text-primary-200'
                    : 'hover:text-grey-400'
                ]"
                @click.stop.prevent="onBookmarkClicked(collection, group)"
              >
                <span>{{ group.name }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div v-else class="w-full h-full p-4 flex items-center justify-center">
      <div class="text-seven leading-seven text-center">
        To save website into Collection you need to
        <NuxtLink to="/collections" class="text-primary-500"
          >create Lists</NuxtLink
        >
        first
      </div>
    </div>
  </div>

  <div
    v-else
    @click.stop.prevent
    class="absolute top-0 left-0 w-full h-full bg-white overflow-auto cursor-default p-3 flex flex-col items-center justify-center"
  >
    <div
      class="text-center"
      :class="[
        compact
          ? 'text-sm leading-sm mb-2'
          : 'text-seven leading-seven sm:text-five sm:leading-five mb-4'
      ]"
    >
      Register with one click <br />to save websites into Collections
    </div>
    <WtfGithubLoginButton size="small" redirect="/collections" text="Login" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OpenedFolderIcon from '@/assets/icons/opened-folder.svg?inline'
// import UnorderedListIcon from '@/assets/icons/unordered-list.svg?inline'

export default {
  components: {
    OpenedFolderIcon
    // UnorderedListIcon
  },
  props: {
    showcase: {
      type: Object,
      default: null
    },
    compact: {
      type: Boolean,
      default: false
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

<style lang="postcss" scoped>
.root {
  & ul {
    margin-left: 1.5rem;
    & li {
      position: relative;
    }
    & li:before {
      position: absolute;
      left: -1rem;
      top: 0%;
      content: '';
      display: block;
      border-left: 1px solid theme('colors.grey.100');
      height: 50%;
      border-bottom: 1px solid theme('colors.grey.100');
      width: 10px;
    }
    & li:after {
      position: absolute;
      left: -1rem;
      bottom: -7px;
      content: '';
      display: block;
      border-left: 1px solid theme('colors.grey.100');
      height: 100%;
    }
    & li:last-child:after {
      display: none;
    }
  }
}
/* ul ul {
  margin-left: 1.5rem;
} */
/* ul li {
  position: relative;
} */
/* ul li:before {
  position: absolute;
  left: -1rem;
  top: 0%;
  content: '';
  display: block;
  border-left: 1px solid theme('colors.grey.100');
  height: 50%;
  border-bottom: 1px solid theme('colors.grey.100');
  width: 10px;
} */
/* ul li:after {
  position: absolute;
  left: -1rem;
  bottom: -7px;
  content: '';
  display: block;
  border-left: 1px solid theme('colors.grey.100');
  height: 100%;
} */

/* ul li.root:before {
  display: none;
}
ul li.root:after {
  display: none;
} */
/* ul li:last-child:after {
  display: none;
} */
</style>
