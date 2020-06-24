<template>
  <div class="intrinsic w-full h-full" @click="changeSlider">
    <!-- <pre class="absolute top-0 z-30">{{ index }}</pre> -->
    <img
      v-if="imagesArray.length"
      :src="imagesArray[0].screenshotUrl"
      alt=""
      class="absolute top-0 left-0 w-full h-full object-top object-cover"
    />
    <img
      v-if="imagesArray.length > 1"
      :src="imagesArray[1].screenshotUrl"
      alt=""
      class="absolute top-0 left-0 w-full h-full object-top object-cover"
    />
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
      imagesArray: []
    }
  },
  watch: {
    activeIndex() {
      this.imagesArray.push(this.featured[this.getNextSlide()])
      this.imagesArray.shift()
    }
  },
  created() {
    this.imagesArray.push(this.featured[this.staticIndex])
  },
  methods: {
    changeSlider(e) {
      // console.log('changeSlider', this.imagesArray[0].index)
      this.$emit('change-slide', this.imagesArray[0].index)
    },
    getNextSlide() {
      return sliderMatrix
        .map((m) => {
          if (m[2] === this.activeIndex) {
            return m[this.staticIndex]
          }
        })
        .filter((i) => i !== undefined)[0]
    }
  }
}
</script>

<style></style>
