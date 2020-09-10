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
            ref="showcase-image-wrapper"
            class="showcase-image-wrapper absolute top-0 left-0 w-full h-full cursor-pointer overflow-hidden"
            @click="staticIndex === 2 ? clickMain(showcase) : changeSlider()"
          >
            <img
              ref="showcase"
              class="h-full"
              sizes="(min-width: 834px) 50vw, 100vw"
              :srcset="srcset(showcase.screenshotUrl)"
              :src="`https://res.cloudinary.com/nuxt/image/upload/w_1200,h_900,f_auto,q_auto/${showcase.screenshotUrl}`"
              alt=""
            />
          </div>
        </div>

        <template v-if="staticIndex === 2">
          <div class="relative">
            <NuxtLink
              v-for="showcase in activeShowcases"
              :key="showcase.id"
              class="absolute top-0 left-0 mt-4"
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
      activeShowcases: [],
      imageRatio: '4:3'
    }
  },
  computed: {
    intristicRatio() {
      if (!this.imageRatio) {
        return 0
      } else {
        const sizes = this.imageRatio.split(':')
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
  watch: {
    activeShowcases(value) {
      this.$emit('active-showcases-change', value)
    },
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
    this.activeShowcases.push(this.featured[this.staticIndex])
  },
  mounted() {
    this.$nextTick(() => {
      this.enterTitleAnimation(true)
    })
  },
  methods: {
    clickMain(showcase) {
      this.$store.commit('SET_MODAL', true)
      this.$router.push({
        name: 'explore-website',
        params: { website: showcase.slug }
      })
    },
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
    },
    src(screenshot) {
      return this.generateSrc(screenshot, 1200)
    },
    srcset(screenshot) {
      return [160, 240, 320, 560, 800, 920, 1040, 1200]
        .map((size) => this.generateSrc(screenshot, size, true))
        .join(',')
    },
    generateSrc(screenshot, size, displayRatio = false) {
      return `https://res.cloudinary.com/nuxt/image/upload/w_${size},${
        this.imageRatio ? `h_${Math.round(size * this.intristicRatio)}` : ''
      },f_auto,q_auto/${screenshot}${displayRatio ? ` ${size}w` : ''}`
    }
  }
}
</script>

<style scoped>
/* .intrinsic {
  padding-bottom: 56.25%;
  position: relative;
} */
</style>
