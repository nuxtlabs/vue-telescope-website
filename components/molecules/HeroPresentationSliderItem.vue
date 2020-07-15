<template>
  <div class="slider-wrapper w-full">
    <template v-if="activeShowcases.length">
      <div class="showcase-wrapper">
        <div
          class="intrinsic w-full h-full relative shadow-xl rounded-xl overflow-hidden bg-grey-200"
        >
          <div
            v-for="showcase in activeShowcases"
            :key="showcase.id"
            ref="showcase-image-wrapper"
            class="showcase-image-wrapper absolute top-0 left-0 w-full h-full cursor-pointer overflow-hidden"
            @click="
              staticIndex === 2
                ? $router.push({
                    name: 'explore-website',
                    params: { website: showcase.slug }
                  })
                : changeSlider()
            "
          >
            <img
              ref="showcase"
              class=""
              :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,h_900/${showcase.screenshotUrl}`"
              alt=""
            />
          </div>
        </div>

        <template v-if="staticIndex === 2">
          <div class="relative mt-4">
            <NuxtLink
              v-for="showcase in activeShowcases"
              :key="showcase.id"
              class="absolute top-0 left-0"
              :to="{
                name: 'explore-website',
                params: { website: showcase.slug }
              }"
            >
              <h2
                ref="showcase-title"
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

<script>
// import { SplitText } from 'gsap/SplitText'
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
      // splitText: null
    }
  },
  watch: {
    activeIndex() {
      this.leaveTitleAnimation()

      this.$gsap.to(this.$refs['showcase-image-wrapper'][0], {
        x: this.getDirection() === 'left' ? '-100%' : '100%',
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {}
      })
      this.$gsap.to(this.$refs.showcase[0], {
        x: this.getDirection() === 'left' ? '100%' : '-100%',
        scale: 1.05,
        duration: 1,
        ease: 'expo.inOut',
        onComplete: () => {}
      })

      this.activeShowcases.push(this.featured[this.getNextSlide()])

      this.$nextTick(() => {
        // this.enterTitleAnimation()
        this.$gsap.from(this.$refs['showcase-image-wrapper'][1], {
          x: this.getDirection() === 'left' ? '100%' : '-100%',
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => {
            this.activeShowcases.shift()
          }
        })
        this.$gsap.from(this.$refs.showcase[1], {
          x: this.getDirection() === 'left' ? '-100%' : '100%',
          scale: 1.05,
          duration: 1,
          ease: 'expo.inOut',
          onComplete: () => {}
        })
      })
    }
  },
  created() {
    // this.splitText = new this.$SplitText()
    this.activeShowcases.push(this.featured[this.staticIndex])
  },
  mounted() {
    this.$nextTick(() => {
      this.enterTitleAnimation(true)
    })
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
    },
    // goToShowcase() {
    //   console.log('goToShowcase')
    // },
    leaveTitleAnimation() {
      if (this.staticIndex === 2) {
        this.$gsap.set(this.$refs['showcase-title'][0], {
          opacity: 1
        })
        const splitted = new this.$SplitText(this.$refs['showcase-title'][0], {
          type: ' lines'
        })

        let currentStagger = 0
        this.$gsap.to(splitted.lines, {
          opacity: 0,
          y: '-100%',
          delay: 0.15,
          stagger: {
            each: 0.05,
            onStart: (i) => {
              currentStagger++
              if (currentStagger === splitted.lines.length) {
                this.$nextTick(() => {
                  this.enterTitleAnimation()
                })
              }
            }
          },
          // duration: 1,
          ease: 'power4.inOut',
          onComplete: () => {}
        })
      }
    },
    enterTitleAnimation(initial = false) {
      if (this.staticIndex === 2) {
        const splitted = new this.$SplitText(
          this.$refs['showcase-title'][initial ? 0 : 1],
          {
            type: 'lines'
          }
        )
        this.$gsap.set(this.$refs['showcase-title'][initial ? 0 : 1], {
          opacity: 1
        })
        this.$gsap.from(splitted.lines, {
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
  }
}
</script>

<style scoped>
.intrinsic {
  padding-bottom: 56.25%;
  position: relative;
}
</style>
