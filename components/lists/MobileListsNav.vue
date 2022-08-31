<template>
  <div class="block md:hidden">
    <div class="fixed body-lock-hack bottom-0 left-1/2 z-10 transform -translate-x-1/2 pb-4">
      <AppButton
        appearance="primary"
        class="min-w-[8rem]"
        @click.native="show = true"
      >
        My Lists
      </AppButton>
    </div>

    <MobileSlideModal v-if="show" label="My Lists:" @close="show = false">
      <CreateListButton class="mb-2" />

      <span class="relative block overflow-hidden px-2 pb-4">
        <transition-group
          :css="false"
          @enter="enterAnimation"
          @leave="leaveAnimation"
        >
          <ListNavItem
            v-for="list in sortedLists"
            :key="list.id"
            class="px-1 overflow-hidden"
            :list="list"
          />
        </transition-group>
      </span>
    </MobileSlideModal>
  </div>
</template>

<script setup lang="ts">
import { timeline } from 'motion'

const { sortedLists } = useLists()

const show = ref(false)

function enterAnimation (el, done) {
  timeline([
    [el, { opacity: 0, y: -10 }, { duration: 0 }],
    [el, { opacity: 1, y: 0 }, { duration: 0.25, easing: 'linear' }]
  ])
  // TODO: complete event
  setTimeout(() => {
    // Fix bug with Popup positioning
    el.style.transform = null
    done()
  }, 250)
}
function leaveAnimation (el, done) {
  timeline([
    [el, { height: `${el.offsetHeight}px`, opacity: 1 }, { duration: 0 }],
    [el, { height: '0px', opacity: 0 }, { duration: 0.25, easing: 'linear' }]
  ])
  // TODO: complete event
  setTimeout(() => {
    done()
  }, 250)
}
</script>
