<template>
  <div class="block md:hidden">
    <!-- <button
      class="focus:outline-none flex items-center justify-center absolute top-0 right-0 text-grey-900 hover:text-primary-500 -mt-9 mr-2"
      @click="show = true"
    >
      <UnorderedListIcon class="h-7 w-7 overflow-visible" />
    </button> -->
    <div class="fixed bottom-0 left-1/2 z-10 transform -translate-x-1/2 pb-4">
      <AppButton @click.native="show = true" appearance="primary" class="">
        My Collections
      </AppButton>
    </div>

    <DribbbleLikeModalWrapper
      v-if="show"
      @close="show = false"
      label="Your Collections:"
    >
      <CreateCollection class="mb-4" />

      <transition-group
        :css="false"
        @enter="enterAnimation"
        @leave="leaveAnimation"
        class="relative block overflow-hidden p-2 py-4"
      >
        <CollectionListItem
          v-for="collection in sortedCollections"
          :key="collection.id"
          class="px-1 overflow-hidden"
          :collection="collection"
        />
      </transition-group>
    </DribbbleLikeModalWrapper>
  </div>
</template>

<script>
import UnorderedListIcon from '@/assets/icons/unordered-list.svg?inline'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    UnorderedListIcon
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapGetters({ sortedCollections: 'collections/sortedCollections' })
  },
  methods: {
    enterAnimation(el, done) {
      this.$gsap.fromTo(
        el,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.25,
          onComplete: done
        }
      )
    },
    leaveAnimation(el, done) {
      this.$gsap.set(el, {
        transformOrigin: 'left'
      })
      this.$gsap.to(el, {
        height: 0,
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
        onComplete: done
      })
    }
  }
}
</script>

<style scoped></style>
