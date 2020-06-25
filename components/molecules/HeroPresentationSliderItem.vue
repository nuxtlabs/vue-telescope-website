<template>
  <div class="intrinsic w-full h-full" @click="changeSlider">
    <template v-if="activeShowcases.length">
      <div
        v-for="showcase in activeShowcases"
        :key="showcase.id"
        ref="showcase-wrapper"
        class="absolute top-0 left-0 w-full h-full object-top object-cover cursor-pointer overflow-hidden"
      >
        <img ref="showcase" :src="showcase.screenshotUrl" alt="" />
      </div>
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
      // console.log(this.$refs['showcase-wrapper'])

      this.$gsap.to(this.$refs['showcase-wrapper'][0], {
        x: this.getDirection() === 'left' ? '-100%' : '100%',
        // opacity: 0.5,
        duration: 1.25,
        ease: 'expo.in',
        onComplete: () => {}
      })
      this.$gsap.to(this.$refs.showcase[0], {
        x: this.getDirection() === 'left' ? '100%' : '-100%',
        // opacity: 0.5,
        duration: 1.25,
        ease: 'expo.in',
        onComplete: () => {}
      })

      this.activeShowcases.push(this.featured[this.getNextSlide()])

      this.$nextTick(() => {
        // console.log(this.$refs['showcase-wrapper'][1])

        this.$gsap.from(this.$refs['showcase-wrapper'][1], {
          x: this.getDirection() === 'left' ? '100%' : '-100%',
          // opacity: 0.5,
          duration: 1.25,
          ease: 'expo.out',
          onComplete: () => {
            this.activeShowcases.shift()
          }
        })
        this.$gsap.from(this.$refs.showcase[1], {
          x: this.getDirection() === 'left' ? '-100%' : '100%',
          scale: 1.05,
          // opacity: 0.5,
          duration: 1.25,
          ease: 'expo.out',
          onComplete: () => {}
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
      if (this.activeShowcases.length > 1) return
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
