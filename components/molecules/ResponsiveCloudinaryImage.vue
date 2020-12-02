<template>
  <div
    v-observe-visibility="{
      callback: lazyLoadImage,
      throttle: 250,
      once: true
    }"
    :style="[intristicRatioPadding]"
    class="overflow-hidden relative bg-grey-50"
  >
    <div
      ref="scrim"
      style="backdrop-filter: blur(18px)"
      class="absolute top-0 left-0 w-full h-full z-10 rounded-xl overflow-hidden pointer-events-none"
    ></div>
    <noscript>
      <img :src="src" :alt="alt" />
    </noscript>
    <img
      v-if="show"
      ref="img"
      :src="src"
      :srcset="srcset"
      :sizes="sizes"
      :alt="alt"
      class="w-full"
      :class="[ratio && 'absolute top-0 left-0']"
    />
  </div>
</template>

<script>
export default {
  props: {
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
  },
  data() {
    return {
      show: false,
      loaded: false
    }
  },
  computed: {
    cloudinaryId() {
      return this.url.split('/').pop()
    },
    intristicRatio() {
      if (!this.ratio) {
        return 0
      } else {
        const sizes = this.ratio.split(':')
        const ratio = sizes[1] / sizes[0]
        return ratio
      }
    },
    intristicRatioPadding() {
      return {
        'padding-bottom': `${this.intristicRatio * 100}%`
      }
    },
    src() {
      return this.generateSrc(1200)
    },
    srcset() {
      return [160, 240, 320, 560, 800, 920, 1040, 1200]
        .map((size) => this.generateSrc(size, true))
        .join(',')
    }
  },
  methods: {
    generateSrc(size, displayRatio = false) {
      return `https://res.cloudinary.com/nuxt/image/upload/w_${size},${
        this.ratio ? `h_${Math.round(size * this.intristicRatio)}` : ''
      },f_auto,q_auto${this.pixelate ? '/e_pixelate:10' : ''}/vue-telemetry/${
        this.cloudinaryId
      }${displayRatio ? ` ${size}w` : ''}`
    },
    lazyLoadImage(isVisible, entry) {
      if (isVisible) {
        this.show = true
        this.$nextTick(() => {
          const lazyImage = this.$refs.img
          lazyImage.addEventListener('load', () => {
            // lazyImage.classList.add('lazy-loaded')
            this.loaded = true
            this.$gsap.to(this.$refs.scrim, {
              opacity: 0,
              duration: 0.3,
              ease: 'none'
            })
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
    }
  }
}
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
