<template>
  <div v-click-outside="() => $emit('close')">
    <div ref="scrim" class="bg-white absolute top-0 left-0 w-full h-full"></div>
    <!-- <div
      v-if="!compact"
      ref="bg"
      style="opacity: 0"
      class="absolute top-0 left-0 w-full h-full xl:rounded-xl"
    ></div> -->

    <transition name="fade">
      <div
        v-if="showCollections"
        class="absolute top-0 left-0 w-full h-full overflow-auto cursor-default"
      >
        <div
          v-if="$strapi.user"
          @click.stop.prevent
          :class="compact ? 'p-3' : 'p-8'"
        >
          <div v-if="collectionsWithGroups.length">
            <div
              class="font-bold-body-weight"
              :class="[
                compact
                  ? 'text-base leading-base mb-1'
                  : 'text-six leading-six mb-4'
              ]"
            >
              Save to:
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
                  <li
                    v-for="(group, i) in collection.groups"
                    :key="group.id"
                    class="flex items-center"
                  >
                    <!-- <span>
                {{ collection.groups.length === i + 1 ? 'last' : 'regular' }}
              </span> -->
                    <span
                      class="inline-flex text-grey-200 mr-2"
                      :class="[compact ? 'w-4 h-5' : 'w-6 h-6']"
                    >
                      <svg
                        v-if="collection.groups.length === i + 1"
                        preserveAspectRatio="none"
                        class="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 0V12H24"
                          stroke="currentColor"
                          vector-effect="non-scaling-stroke"
                        />
                      </svg>
                      <svg
                        v-else
                        preserveAspectRatio="none"
                        class="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 0V12M12 12H24M12 12V24"
                          stroke="currentColor"
                          vector-effect="non-scaling-stroke"
                        />
                      </svg>
                    </span>
                    <button
                      class="focus:outline-none text-left text-base"
                      :class="[
                        isBookmarked(group)
                          ? 'text-primary-500 has-hover:hover:text-primary-200'
                          : 'has-hover:hover:text-grey-400',
                        compact
                          ? 'text-sm leading-sm'
                          : 'text-base leading-base'
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

          <div
            v-else
            class="w-full h-full p-4 flex items-center justify-center"
          >
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
          class="w-full h-full p-3 flex flex-col items-center justify-center"
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
          <WtfGithubLoginButton
            :size="compact ? 'small' : 'base'"
            redirect="/collections"
            text="Login"
          />
        </div>
      </div>
    </transition>
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
  data() {
    return {
      showCollections: false
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
  mounted() {
    setTimeout(() => {
      this.showCollections = true
    }, 200)

    // if (!this.compact) {
    //   const bg = this.$refs.bg
    //   this.$gsap.fromTo(
    //     bg,
    //     {
    //       scale: 0.95,
    //       opacity: 0
    //     },
    //     {
    //       scale: 1,
    //       opacity: 1,
    //       delay: 0.2,
    //       duration: 0.3,
    //       clearProps: true
    //       // ease: 'power4.inOut'
    //     }
    //   )
    // }

    const scrim = this.$refs.scrim
    this.$gsap.set(scrim, {
      transformOrigin: 'top'
    })
    this.$gsap.fromTo(
      scrim,
      {
        scaleY: 0
      },
      {
        scaleY: 1,
        duration: 0.4,
        clearProps: true,
        ease: 'power4.inOut'
        // onComplete: () => {

        // }
      }
    )
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
/* .root {
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
} */
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms
      theme('transitionTimingFunction.ease-in-out-material-sharp'),
    transform 200ms theme('transitionTimingFunction.ease-in-out-material-sharp');
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
