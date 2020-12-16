<template>
  <div @mouseleave="isBookmarking = false">
    <button
      @click.stop.prevent="isBookmarking = !isBookmarking"
      :class="[isBookmarkedAtLeastOnce ? 'bg-primary-50' : 'bg-grey-100']"
      class="focus:outline-none m-2 p-2 rounded-lg absolute top-0 right-0 z-10 transition-colors duration-400"
    >
      <StarIcon
        class="w-5 h-5 transition-colors duration-400"
        :class="[
          isBookmarkedAtLeastOnce
            ? 'text-primary-500 fill-primary'
            : 'text-grey-800'
        ]"
      />
    </button>
    <transition name="fade">
      <ShowcaseBookmarkMenu
        v-if="isBookmarking"
        :showcase="showcase"
        :compact="compact"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StarIcon from '@/assets/icons/star.svg?inline'

export default {
  components: {
    StarIcon
  },
  props: {
    showcase: {
      type: Object,
      default: () => {}
    },
    compact: {
      type: Boolean,
      default: false
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
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 250ms;
  transition-property: opacity, transform;
  transition-timing-function: ease;
}

.fade-enter {
  opacity: 0;
  transform: scale(1.02);
}

.fade-leave-active {
  opacity: 0;
  transform: scale(0.98);
}
</style>
