<template>
  <div @mouseleave="mouseLeaveHandler" @mouseenter="mouseEnterHandler">
    <button
      :class="[
        isBookmarkedAtLeastOnce
          ? 'bg-primary-50 has-hover:hover:bg-primary-100'
          : 'bg-grey-100 has-hover:hover:bg-grey-50',
        compact ? 'm-2' : 'm-2 xs:m-4 sm:m-8'
      ]"
      class="focus:outline-none p-2 rounded-lg absolute top-0 right-0 z-10 transition-colors duration-400"
      @click.stop.prevent="isBookmarking = !isBookmarking"
    >
      <StarIcon
        class="transition-colors duration-400"
        :class="[
          compact ? 'w-5 h-5' : 'w-5 h-5 sm:w-6 sm:h-6',
          isBookmarkedAtLeastOnce
            ? 'text-primary-500 fill-primary'
            : 'text-grey-800'
        ]"
      />
    </button>
    <div v-if="sortable" class="absolute top-0 left-0 z-10 flex gap-2 p-2">
      <button
        class="flex items-center justify-center w-8 h-8 p-1 transform rotate-180 rounded-lg focus:outline-none bg-grey-50 hover:bg-grey-200"
        @click.stop.prevent="
          moveUpRemoteShowcase({
            showcase,
            group: selectedGroup,
            list: selectedList
          })
        "
      >
        <DownIcon class="w-4 h-4" />
      </button>
      <button
        class="flex items-center justify-center w-8 h-8 p-1 transform rounded-lg focus:outline-none bg-grey-50 hover:bg-grey-200"
        @click.stop.prevent="
          moveDownRemoteShowcase({
            showcase,
            group: selectedGroup,
            list: selectedList
          })
        "
      >
        <DownIcon class="w-4 h-4" />
      </button>
    </div>

    <ShowcaseBookmarkMenu
      v-if="isBookmarking"
      :showcase="showcase"
      :compact="compact"
      @close="isBookmarking = false"
    />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Showcase } from '~/types'

import StarIcon from '@/assets/icons/star.svg'
import DownIcon from '@/assets/icons/arrow-down.svg'

const {
  lists,
  selectedList,
  selectedGroup,
  moveUpRemoteShowcase,
  moveDownRemoteShowcase
} = useLists()

const props = defineProps({
  showcase: {
    type: Object as PropType<Showcase>,
    default: null
  },
  compact: {
    type: Boolean,
    default: false
  },
  sortable: {
    type: Boolean,
    default: false
  }
})

const isBookmarking = ref(false)
const hovered = ref(false)
const timer = ref(null)

const isBookmarkedAtLeastOnce = computed(() => {
  const showcases = lists.value
    .flatMap(list => list.groups)
    .flatMap(group => group.showcases)
  return showcases?.find(s => s && s.id === props.showcase.id)
})

function mouseEnterHandler () {
  hovered.value = true
  clearTimeout(timer.value)
}

function mouseLeaveHandler () {
  hovered.value = false
  timer.value = setTimeout(closeMenu, 1000)
}

function closeMenu () {
  if (props.compact) { isBookmarking.value = false }
}
</script>
