<template>
  <div class="slider-wrapper w-full">
    <template v-if="activeShowcases.length">
      <div class="showcase-wrapper">
        <div
          :style="[intristicRatioPadding]"
          class="intrinsic w-full h-full relative shadow-xl rounded-xl overflow-hidden safari-radii-hack bg-grey-200"
        >
          <div
            v-for="showcase in activeShowcases"
            :key="showcase.id"
            ref="showcaseImageWrapperRef"
            class="showcase-image-wrapper absolute top-0 left-0 w-full h-full cursor-pointer overflow-hidden"
            @click="staticIndex === 2 ? clickMain(showcase) : changeSlider()"
          >
            <img
              ref="showcaseImgRef"
              width="1200"
              height="900"
              loading="lazy"
              class="h-full"
              sizes="(min-width: 834px) 50vw, 100vw"
              :srcset="srcset(showcase.screenshotUrl)"
              :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,h_900,f_auto,q_auto/${showcase.screenshotUrl}`"
              alt=""
            >
          </div>
        </div>

        <template v-if="staticIndex === 2">
          <div class="relative">
            <NuxtLink
              v-for="showcase in activeShowcases"
              :key="showcase.id"
              class="absolute top-0 left-0 mt-4"
              :to="{
                name: 'explore-showcase',
                params: { showcase: showcase.slug }
              }"
            >
              <h2
                ref="showcaseTitleRef"
                class="opacity-0 text-six leading-six font-display-weight overflow-hidden"
              >
                {{ showcase.siteName || showcase.title }}
              </h2>
            </NuxtLink>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { animate, timeline } from 'motion'

const sliderMatrix = [
  [0, 1, 2, 3, 4],
  [0, 2, 3, 4, 0],
  [2, 3, 4, 0, 1],
  [3, 4, 0, 1, 2],
  [4, 0, 1, 2, 3]
]

const imageRatio = '4:3'

const props = defineProps({
  featured: {
    type: Array,
    default: () => []
  },
  staticIndex: {
    type: Number,
    default: null
  },
  activeIndex: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['change-slide', 'active-showcases-change'])

const activeShowcases = ref([])

const showcaseImageWrapperRef = ref([])
const showcaseImgRef = ref([])
const showcaseTitleRef = ref([])

const router = useRouter()

const { setModal } = useModal()

const intristicRatio = computed(() => {
  if (!imageRatio) {
    return 0
  } else {
    const sizes = imageRatio.split(':').map(i => parseInt(i))
    const ratio = sizes[1] / sizes[0]
    return ratio
  }
})

const intristicRatioPadding = computed(() => {
  return {
    'padding-bottom': `${intristicRatio.value * 100}%`
  }
})

watch(
  () => props.activeIndex,
  () => {
    leaveTitleAnimation()

    // Use offsetWidth because of non-Chrome translateX(100%) bug
    const w0w = showcaseImageWrapperRef.value[0].offsetWidth
    const i0w = showcaseImgRef.value[0].offsetWidth

    animate(showcaseImageWrapperRef.value[0], {
      x: getDirection() === 'left' ? -w0w : w0w
    }, { duration: 0.75, easing: [0.85, 0, 0.15, 1] })
    animate(showcaseImgRef.value[0], {
      x: getDirection() === 'left' ? i0w : -i0w,
      scale: 1.05
    }, { duration: 0.75, easing: [0.85, 0, 0.15, 1] })

    activeShowcases.value.push(props.featured[getNextSlide()])

    nextTick(() => {
      enterTitleAnimation()

      const w1w = showcaseImageWrapperRef.value[1].offsetWidth
      const i1w = showcaseImgRef.value[1].offsetWidth

      timeline([
        [showcaseImageWrapperRef.value[1], {
          x: getDirection() === 'left' ? w1w : -w1w
        }, { duration: 0 }],
        [showcaseImageWrapperRef.value[1], {
          x: 0
        }, { duration: 0.75, easing: [0.85, 0, 0.15, 1] }]
      ])

      timeline([
        [showcaseImgRef.value[1], {
          x: getDirection() === 'left' ? -i1w : i1w,
          scale: 1.05
        }, { duration: 0 }],
        [showcaseImgRef.value[1], {
          x: 0,
          scale: 1
        }, { duration: 0.75, easing: [0.85, 0, 0.15, 1] }]
      ])

      // TODO: complete event
      setTimeout(() => {
        activeShowcases.value.shift()
      }, 750)
    })
  }
)

watch(activeShowcases.value, (value) => {
  emit('active-showcases-change', value)
})

function clickMain (showcase) {
  setModal(true)
  router.push({
    name: 'explore-showcase',
    params: { showcase: showcase.slug }
  })
}

function changeSlider () {
  if (activeShowcases.value.length > 1) { return }
  emit('change-slide', activeShowcases.value[0].index)
}

function getNextSlide () {
  const i = sliderMatrix
    .map((m) => {
      if (m[2] === props.activeIndex) {
        return m[props.staticIndex]
      }
      return null
    })
    .filter(Boolean)[0]
  return i || 0
}

function getDirection () {
  const activeMatrix = sliderMatrix
    .map((m) => {
      // Get current slide matrix, before nextSlide
      if (m[props.staticIndex] === activeShowcases.value[0].index) {
        return m
      }
      return null
    })
    .filter(Boolean)[0]
  return activeMatrix.findIndex(i => i === props.activeIndex) >= 2
    ? 'left'
    : 'right'
}

function leaveTitleAnimation () {
  if (props.staticIndex === 2) {
    timeline([
      [showcaseTitleRef.value[0], { transformOrigin: 'top left' }, { duration: 0 }],
      [showcaseTitleRef.value[0], { opacity: 0, scale: 0.9, filter: 'blur(40px)' }, { duration: 0.6, easing: 'ease-in' }]
    ])
    enterTitleAnimation()
  }
}
function enterTitleAnimation (initial = false) {
  if (props.staticIndex === 2) {
    timeline([
      [showcaseTitleRef.value[initial ? 0 : 1], { opacity: 0, scale: 0.9, transformOrigin: 'top left', filter: 'blur(40px)' }, { duration: 0 }],
      [showcaseTitleRef.value[initial ? 0 : 1], { opacity: 1, scale: 1, filter: 'blur(0px)' }, { duration: 0.6, easing: 'ease-out' }]
    ])
  }
}

function srcset (screenshot) {
  return [160, 240, 320, 560, 800, 920, 1040, 1200]
    .map(size => generateSrc(screenshot, size, true))
    .join(',')
}

function generateSrc (screenshot, size, displayRatio = false) {
  return `https://res.cloudinary.com/nuxt/image/upload/w_${size},${
    imageRatio ? `h_${Math.round(size * intristicRatio.value)}` : ''
  },f_auto,q_auto/${screenshot}${displayRatio ? ` ${size}w` : ''}`
}

onMounted(() => {
  activeShowcases.value.push(props.featured[props.staticIndex])
  setTimeout(() => {
    enterTitleAnimation(true)
  }, 500)
})

</script>
