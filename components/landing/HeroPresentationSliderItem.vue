<template>
  <div class="slider-wrapper w-full">
    <template v-if="activeShowcases.length">
      <div class="showcase-wrapper">
        <div
          :style="[intristicRatioPadding]"
          class="intrinsic w-full h-full relative shadow-xl rounded-xl overflow-hidden bg-grey-200"
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
const { $gsap, $SplitText } = useNuxtApp()

const sliderMatrix = [
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 0],
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

const emit = defineEmits(['change-slide'])

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

    $gsap.to(showcaseImageWrapperRef.value[0], {
      x: getDirection() === 'left' ? '-100%' : '100%',
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => {}
    })
    $gsap.to(showcaseImgRef.value[0], {
      x: getDirection() === 'left' ? '100%' : '-100%',
      scale: 1.05,
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => {}
    })

    activeShowcases.value.push(props.featured[getNextSlide()])

    nextTick(() => {
      // enterTitleAnimation()
      $gsap.from(showcaseImageWrapperRef.value[1], {
        x: getDirection() === 'left' ? '100%' : '-100%',
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          activeShowcases.value.shift()
        }
      })
      $gsap.from(showcaseImgRef.value[1], {
        x: getDirection() === 'left' ? '-100%' : '100%',
        scale: 1.05,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {}
      })
    })
  }
)

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
      // get current slide matrix, before nextSlide
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
    $gsap.set(showcaseTitleRef.value[0], {
      opacity: 1
    })
    const splitted = new $SplitText(showcaseTitleRef.value[0], {
      type: ' lines'
    })

    let currentStagger = 0
    $gsap.to(splitted.lines, {
      opacity: 0,
      y: '-100%',
      delay: 0.15,
      stagger: {
        each: 0.05,
        onStart: () => {
          currentStagger++
          if (currentStagger === splitted.lines.length) {
            nextTick(() => {
              enterTitleAnimation()
            })
          }
        }
      },
      // duration: 1,
      ease: 'power4.inOut',
      onComplete: () => {}
    })
  }
}
function enterTitleAnimation (initial = false) {
  if (props.staticIndex === 2) {
    const splitted = new $SplitText(showcaseTitleRef.value[initial ? 0 : 1], {
      type: 'lines'
    })
    $gsap.set(showcaseTitleRef.value[initial ? 0 : 1], {
      opacity: 1
    })
    $gsap.from(splitted.lines, {
      opacity: 0,
      y: '100%',
      // duration: 1,
      delay: 0.15,
      stagger: 0.05,
      ease: 'power4.inOut',
      onComplete: () => {
        splitted.revert()
      }
    })
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
  nextTick(() => {
    enterTitleAnimation(true)
  })
})
</script>
