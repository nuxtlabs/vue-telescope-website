<template>
  <div class="p-2" @mouseleave="isBookmarking = false">
    <NuxtLink
      class="group block hover-effect relative p-3 cursor-pointer"
      :to="{
        name: 'explore-website',
        params: {
          website: showcase.slug
        }
      }"
      @click.prevent="open()"
    >
      <div class="rounded-lg overflow-hidden mb-4 relative">
        <ResponsiveCloudinaryImage
          :url="showcase.screenshotUrl"
          ratio="4:3"
          sizes="(min-width: 834px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <button
          @click.prevent="isBookmarking = !isBookmarking"
          :class="[isBookmarkedAtLeastOnce ? 'bg-primary-500' : 'bg-grey-200']"
          class="m-2 p-2 rounded-lg absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        >
          <SaveIcon
            class="w-5 h-5"
            :class="[
              isBookmarkedAtLeastOnce ? 'text-primary-900' : 'text-grey-800'
            ]"
          />
        </button>
        <transition name="fade">
          <ShowcaseBookmark v-if="isBookmarking" :showcase="showcase" />
        </transition>
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
import { mapState } from 'vuex'
import SaveIcon from '@/assets/icons/save.svg?inline'

export default {
  components: {
    SaveIcon
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
    ...mapState({
      collections: (state) => state.collections.collections
    }),
    isBookmarkedAtLeastOnce() {
      const showcases = this.collections
        .flatMap((collection) => collection.groups)
        .flatMap((group) => group.showcases)
      return showcases?.find((s) => s && s.id === this.showcase.id)
    }
  },
  methods: {
    open() {
      this.$store.commit('SET_MODAL', true)
      this.$router.push(`/explore/${this.showcase.slug}`)
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 250ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.fade-enter {
  opacity: 0;
  transform: scale(1.05);
}

.fade-leave-active {
  opacity: 0;
  transform: scale(0.95);
}
</style>
