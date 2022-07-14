<template>
  <div class="block md:hidden">
    <div class="fixed bottom-0 left-1/2 z-10 transform -translate-x-1/2 pb-4">
      <AppButton appearance="primary" class="" @click.native="show = true">
        My Lists
      </AppButton>
    </div>

    <MobileModalWrapper v-if="show" label="Your Lists:" @close="show = false">
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
    </MobileModalWrapper>
  </div>
</template>

<script>
export default {
  setup() {
    const { sortedLists } = useLists()
    return { sortedLists }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    enterAnimation(el, done) {
      this.$gsap.fromTo(
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
    },
    leaveAnimation(el, done) {
      // this.$gsap.set(el, {
      //   transformOrigin: 'left'
      // })
      this.$gsap.to(el, {
        height: 0,
        // scale: 0.9,
        opacity: 0,
        duration: 0.25,
        onComplete: done
      })
    }
  }
}
</script>
