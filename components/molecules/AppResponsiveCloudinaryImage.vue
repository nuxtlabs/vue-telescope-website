<template>
  <div
    v-observe-visibility="{
      callback: lazyLoadImage,
      throttle: 250,
      once: true
    }"
    :style="[intristicRatioPadding]"
    class="overflow-hidden relative bg-primary-50"
  >
    <noscript inline-template>
      <img
        :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,${
          ratio ? `h_${Math.round(1200 * intristicRatio)}` : ''
        }/vue-telemetry/${cloudinaryId}`"
        :alt="alt"
      />
    </noscript>
    <img
      v-if="show"
      ref="img"
      :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,${
        ratio ? `h_${Math.round(1200 * intristicRatio)}` : ''
      }/vue-telemetry/${cloudinaryId}`"
      :srcset="`
          https://res.cloudinary.com/nuxt/image/upload/w_160,${
            ratio ? `h_${Math.round(160 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 160w,
          https://res.cloudinary.com/nuxt/image/upload/w_240,${
            ratio ? `h_${Math.round(240 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 240w,
          https://res.cloudinary.com/nuxt/image/upload/w_320,${
            ratio ? `h_${Math.round(320 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 320w,
          https://res.cloudinary.com/nuxt/image/upload/w_560,${
            ratio ? `h_${Math.round(560 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 560w,
          https://res.cloudinary.com/nuxt/image/upload/w_800,${
            ratio ? `h_${Math.round(800 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 800w,
          https://res.cloudinary.com/nuxt/image/upload/w_920,${
            ratio ? `h_${Math.round(920 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 920w,
          https://res.cloudinary.com/nuxt/image/upload/w_1040,${
            ratio ? `h_${Math.round(1040 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 1040w,
          https://res.cloudinary.com/nuxt/image/upload/w_1200,${
            ratio ? `h_${Math.round(1200 * intristicRatio)}` : ''
          }/vue-telemetry/${cloudinaryId} 1200w
        `"
      :sizes="sizes"
      :alt="alt"
      class="w-full transition-opacity duration-500"
      :class="[
        ratio && 'absolute top-0 left-0',
        loaded ? 'opacity-1' : 'opacity-0'
      ]"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
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
      return this.src.split('/').pop()
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
    }
  },
  methods: {
    lazyLoadImage(isVisible, entry) {
      if (isVisible) {
        this.show = true
        this.$nextTick(() => {
          const lazyImage = this.$refs.img
          lazyImage.addEventListener('load', () => {
            // lazyImage.classList.add('lazy-loaded')
            this.loaded = true
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

<style></style>
