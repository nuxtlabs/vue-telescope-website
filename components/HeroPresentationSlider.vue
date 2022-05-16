<template>
  <div ref="heroPresentationSlider" class="w-full relative opacity-0">
    <div class="w-full relative flex items-center justify-center px-4">
      <div
        v-for="({ id }, i) in featured"
        :key="id"
        class="w-full md:w-1/2"
        :class="[
          `slide-${i + 1}`,
          i === 2 ? 'relative' : 'absolute',
          i !== 2 ? 'hidden md:inline-flex' : 'inline-flex'
        ]"
      >
        <HeroPresentationSliderItem
          :featured="featured"
          :static-index="i"
          :active-index="activeIndex"
          @change-slide="changeSlide"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNuxtApp, useAsyncData, ref, computed, onMounted } from '#imports'
const { $gsap } = useNuxtApp()

const activeIndex = ref(2)

// refs
const heroPresentationSlider = ref(null)

// const activeShowcase = computed(() => {
//   return this.featured[this.activeIndex ? this.activeIndex : 2]
// })

const { find } = useStrapi4()

// TODO: fetchOnServer: false
const { data: featuredData } = await useAsyncData('showcases/featured', () =>
  find('showcases?isFeatured=true&_limit=5')
)
const featured = featuredData.value.map((item, index) => {
  return { ...item, index }
})

function changeSlide(i) {
  activeIndex.value = i
}

onMounted(() => {
  $gsap.fromTo(
    heroPresentationSlider.value,
    {
      opacity: 0,
      scale: 0.75,
      y: '15px'
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.45,
      delay: 0.9,
      ease: 'power4.inOut'
    }
  )
})
</script>

<style>
.slide-1 {
  left: -15%;
  top: 0;
  z-index: 8;
}
.slide-2 {
  left: 0;
  top: 0;
  z-index: 9;
}

.slide-3 {
  z-index: 10;
}

.slide-4 {
  right: 0;
  top: 0;
  z-index: 9;
}
.slide-5 {
  right: -15%;
  top: 0;
  z-index: 8;
}

.slide-1,
.slide-5 {
  transform: scale(0.5);
}
.slide-2,
.slide-4 {
  transform: scale(0.75);
}
</style>
