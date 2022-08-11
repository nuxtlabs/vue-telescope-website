<template>
  <div
    ref="wrapperRef"
    :style="[intristicRatioPadding]"
    class="overflow-hidden relative bg-grey-50"
  >
    <img
      v-if="show"
      ref="imgRef"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      class="lazy w-full"
      :class="[ratio && 'absolute top-0 left-0']"
    >
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  url: {
    type: String,
    default: null
  },
  alt: {
    type: String,
    default: null
  },
  ratio: {
    type: String,
    default: '16:9'
  },
  sizes: {
    type: String,
    default: '100vw'
  },
  pixelate: {
    type: Boolean,
    default: false
  }
})

const show = ref(false)
const loaded = ref(false)

const wrapperRef = ref(null)
const imgRef = ref(null)

const cloudinaryId = computed(() => {
  return props.url.split('/').pop()
})

const intristicRatio = computed(() => {
  if (!props.ratio) {
    return 0
  } else {
    const sizes = props.ratio.split(':')
    const ratio = parseInt(sizes[1]) / parseInt(sizes[0])
    return ratio
  }
})

const intristicRatioPadding = computed(() => {
  return {
    'padding-bottom': `${intristicRatio.value * 100}%`
  }
})

const src = computed(() => {
  return generateSrc(1200)
})
const srcset = computed(() => {
  return [160, 240, 320, 560, 800, 920, 1040, 1200]
    .map(size => generateSrc(size, true))
    .join(',')
})

function generateSrc (size, displayRatio = false) {
  return `https://res.cloudinary.com/nuxt/image/upload/w_${size},${
    props.ratio ? `h_${Math.round(size * intristicRatio.value)}` : ''
  },f_auto,q_auto${props.pixelate ? '/e_pixelate:10' : ''}/vue-telemetry/${
    cloudinaryId.value
  }${displayRatio ? ` ${size}w` : ''}`
}

function lazyLoadImage () {
  show.value = true
  nextTick(() => {
    const lazyImage = imgRef.value
    lazyImage.addEventListener('load', () => {
      lazyImage.classList.add('lazy-loaded')
      loaded.value = true
    })
  })
}

const { stop } = useIntersectionObserver(wrapperRef, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    lazyLoadImage()
    stop()
  }
})
</script>

<style scoped>
.lazy {
  opacity: 0;
}
.lazy.lazy-loaded {
  animation: appear 1000ms forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
    filter: brightness(1) blur(20px);
  }
  10% {
    opacity: 1;
    filter: brightness(2) blur(10px);
  }
  100% {
    opacity: 1;
    filter: brightness(1) blur(0);
  }
}
</style>
