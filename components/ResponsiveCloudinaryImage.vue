<template>
  <div
    ref="el"
    :style="[intristicRatioPadding]"
    class="overflow-hidden relative bg-grey-50"
  >
    <img
      v-if="show"
      ref="imgEl"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      class="w-full"
      :class="[ratio && 'absolute top-0 left-0']"
    />
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

const el = ref(null)
const imgEl = ref(null)

const cloudinaryId = computed(() => {
  return props.url.split('/').pop()
})

const intristicRatio = computed(() => {
  if (!props.ratio) {
    return 0
  } else {
    const sizes = props.ratio.split(':')
    const ratio = sizes[1] / sizes[0]
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
    .map((size) => generateSrc(size, true))
    .join(',')
})

function generateSrc(size, displayRatio = false) {
  return `https://res.cloudinary.com/nuxt/image/upload/w_${size},${
    props.ratio ? `h_${Math.round(size * intristicRatio.value)}` : ''
  },f_auto,q_auto${props.pixelate ? '/e_pixelate:10' : ''}/vue-telemetry/${
    cloudinaryId.value
  }${displayRatio ? ` ${size}w` : ''}`
}

function lazyLoadImage() {
  show.value = true
  nextTick(() => {
    const lazyImage = imgEl.value
    lazyImage.addEventListener('load', () => {
      // lazyImage.classList.add('lazy-loaded')
      loaded.value = true
      // this.$gsap.to(this.$refs.scrim, {
      //   opacity: 0,
      //   duration: 0.3,
      //   ease: 'none'
      // })
      // this.$gsap.fromTo(
      //   lazyImage,
      //   {
      //     opacity: 0
      //     // scale: 1.05
      //   },
      //   {
      //     opacity: 1,
      //     // scale: 1,
      //     duration: 0.2,
      //     ease: 'power4.easeOut'
      //   }
      // )
    })
    // lazyImage.addEventListener('error', () => {
    //   lazyImage.classList.add('lazy-load-error')
    // })
  })
}

const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    lazyLoadImage()
    stop()
  }
})
</script>

<style scoped>
/* .lazy {
  opacity: 0;
  transition: opacity 3000ms;
}
.lazy.lazy-loaded {
  opacity: 1;
} */
</style>
