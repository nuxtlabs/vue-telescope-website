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
      <CreateCollection class="mb-6" />

      <transition-group name="list" class="relative block overflow-hidden">
        <CollectionListItem
          v-for="collection in sortedCollections"
          :key="collection.id"
          class="list-item px-2"
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
  }
}
</script>

<style scoped>
.list-item {
  transition-duration: 250ms;
  transition-property: all;
  transition-timing-function: ease;
}

.list-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.5);
}

.list-leave-active {
  position: absolute;
}
</style>
