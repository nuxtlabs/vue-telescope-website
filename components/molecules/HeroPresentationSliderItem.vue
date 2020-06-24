<template>
  <div class="intrinsic w-full h-full" @click="changeSlider">
    <template v-if="activeShowcases.length">
      <img
        v-for="showcase in activeShowcases"
        :key="showcase.id"
        ref="showcase"
        :src="showcase.screenshotUrl"
        alt=""
        class="absolute top-0 left-0 w-full h-full object-top object-cover cursor-pointer"
      />
    </template>

    <!-- <img
      v-if="activeShowcases.length"
      :src="activeShowcases[0].screenshotUrl"
      alt=""
      class="absolute top-0 left-0 w-full h-full object-top object-cover"
    />
    <img
      v-if="activeShowcases.length > 1"
      :src="activeShowcases[1].screenshotUrl"
      alt=""
      class="absolute top-0 left-0 w-full h-full object-top object-cover"
    /> -->
  </div>
</template>

<script>
const sliderMatrix = [
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 0],
  [2, 3, 4, 0, 1],
  [3, 4, 0, 1, 2],
  [4, 0, 1, 2, 3]
]

export default {
  props: {
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
  },
  data() {
    return {
      activeShowcases: []
    }
  },
  watch: {
    activeIndex() {
      this.$gsap.to(this.$refs.showcase[0], {
        scale: 0.95,
        x: this.getDirection() === 'left' ? -50 : 50,
        opacity: 0.5,
        duration: 0.25,
        ease: 'power4.in',
        onComplete: () => {}
      })

      this.activeShowcases.push(this.featured[this.getNextSlide()])

      this.$nextTick(() => {
        this.$gsap.from(this.$refs.showcase[1], {
          scale: 1.05,
          x: this.getDirection() === 'left' ? 50 : -50,
          opacity: 0.5,
          duration: 0.25,
          ease: 'power4.out',
          onComplete: () => {
            this.activeShowcases.shift()
          }
        })
      })
      // this.activeShowcases.shift()
    }
  },
  created() {
    this.activeShowcases.push(this.featured[this.staticIndex])
  },
  methods: {
    changeSlider(e) {
      // console.log('changeSlider', this.activeShowcases[0].index)
      this.$emit('change-slide', this.activeShowcases[0].index)
    },
    getNextSlide() {
      return sliderMatrix
        .map((m) => {
          if (m[2] === this.activeIndex) {
            return m[this.staticIndex]
          }
        })
        .filter((i) => i !== undefined)[0]
    },
    getDirection() {
      const activeMatrix = sliderMatrix
        .map((m) => {
          // get current slide matrix, before nextSlide
          if (m[this.staticIndex] === this.activeShowcases[0].index) {
            return m
          }
        })
        .filter((i) => i !== undefined)[0]

      return activeMatrix.findIndex((i) => i === this.activeIndex) >= 2
        ? 'left'
        : 'right'
    }
  }
}
</script>

<style></style>
