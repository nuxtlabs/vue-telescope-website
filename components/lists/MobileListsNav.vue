<template>
  <div class="block md:hidden">
    <div class="fixed bottom-0 left-1/2 z-10 transform -translate-x-1/2 pb-4">
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
const { sortedLists } = useLists()
const { $gsap } = useNuxtApp()

const show = ref(false)

function enterAnimation (el, done) {
  $gsap.fromTo(
    el,
    {
      opacity: 0,
      y: -10
    },
    {
      opacity: 1,
      y: 0,
      clearProps: true,
      duration: 0.25,
      onComplete: done
    }
  )
}
function leaveAnimation (el, done) {
  // this.$gsap.set(el, {
  //   transformOrigin: 'left'
  // })
  $gsap.to(el, {
    height: 0,
    // scale: 0.9,
    opacity: 0,
    duration: 0.25,
    onComplete: done
  })
}
</script>
