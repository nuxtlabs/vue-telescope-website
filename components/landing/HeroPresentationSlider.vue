<template>
  <div ref="heroPresentationSliderRef" class="relative w-full opacity-0">
    <div class="fade-hack relative flex items-center justify-center w-full px-4">
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
        <div v-if="i === 2" class="block md:hidden">
          <button
            aria-label="Prev"
            style="top: 50%; transform: translateY(-50%)"
            class="contrast-blend absolute z-10 w-24 h-full flex items-center justify-center overflow-hidden focus:outline-none"
            @click="
              changeSlide(
                activeIndex === 0 ? 4 : activeIndex === 4 ? 3 : activeIndex - 1
              )
            "
          >
            <ArrowLeftIcon class="w-12" />
          </button>
          <button
            aria-label="Next"
            style="top: 50%; transform: translateY(-50%)"
            class="contrast-blend absolute top-0 right-0 z-10 w-24 h-full flex items-center justify-center overflow-hidden focus:outline-none"
            @click="
              changeSlide(
                activeIndex === 0 ? 1 : activeIndex === 4 ? 0 : activeIndex + 1
              )
            "
          >
            <ArrowRightIcon class="w-12" />
          </button>
        </div>
        <HeroPresentationSliderItem
          :featured="featured"
          :static-index="i"
          :active-index="activeIndex"
          @change-slide="changeSlide"
          @active-showcases-change="activeShowcases = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate, scroll } from 'motion'
import type { Showcase } from '~/types'

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg'

const activeIndex = ref(2)
const activeShowcases = ref([])
const heroPresentationSliderRef = ref(null)

// const activeShowcase = computed(() => {
//   return this.featured[this.activeIndex ? this.activeIndex : 2]
// })

const { find } = useStrapi3()

const { data: featuredData } = await useAsyncData('showcases/featured', () =>
  find<Showcase[]>('showcases?isFeatured=true&_limit=5'), { lazy: true, server: false }
)

const featured = computed(() => {
  return featuredData.value
    ? featuredData.value.map((item, index) => {
      return { ...item, index }
    })
    : []
})

function changeSlide (i: number) {
  // Check for fast prev-next click
  if (activeShowcases.value.length > 1) { return }
  activeIndex.value = i
}

onMounted(() => {
  // timeline([
  //   [heroPresentationSliderRef.value, { opacity: 0, scale: 0.75, filter: 'blur(20px)' }, { duration: 0 }],
  //   [heroPresentationSliderRef.value, { opacity: 1, scale: 1, filter: 'blur(0px)' }, { duration: 0.5, easing: 'ease-in-out' }]
  // ])
  setTimeout(() => {
    scroll(animate(heroPresentationSliderRef.value, { opacity: [0, 1], y: [-50, 0], scale: [0.9, 1], filter: ['blur(20px)', 'blur(0px)'] }), {
      target: heroPresentationSliderRef.value,
      offset: ['start end', 'end end']
    })
  }, 500)
})
</script>

<style scoped>
.fade-hack {
  animation: fade-in 1500ms linear 600ms;
}

@keyframes fade-in {
  1% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

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
  /* width: 350px; */
}

.contrast-blend {
  color: white;
  mix-blend-mode: difference;
}
</style>
