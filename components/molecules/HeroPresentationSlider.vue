<template>
  <div ref="hero-presentation-slider" class="w-full relative opacity-0">
    <!-- <pre>{{ activeShowcase }}</pre> -->
    <div class="w-full relative flex items-center justify-center px-4">
      <div
        v-for="({ id }, i) in featured"
        :key="id"
        class="w-full md:w-1/2"
        :class="[
          `slide-${i + 1}`,
          i === 2 ? 'relative' : 'absolute',
          i !== 2 ? 'hidden md:inline-flex' : 'inline-flex'
        ]"
      >
        <div v-if="i === 2" class="block md:hidden">
          <button
            style="top: 50%; transform: translateY(-50%)"
            class="absolute left-0 z-10 w-10 h-10 ml-4 flex items-center justify-center bg-primary-500 rounded-full overflow-hidden shadow-lg focus:outline-none"
            @click="
              changeSlide(
                activeIndex === 0 ? 4 : activeIndex === 4 ? 3 : activeIndex - 1
              )
            "
          >
            <ArrowLeftIcon class="w-6 text-white" />
          </button>
          <button
            style="top: 50%; transform: translateY(-50%)"
            class="absolute top-0 right-0 z-10 w-10 h-10 mr-4 flex items-center justify-center bg-primary-500 rounded-full overflow-hidden shadow-lg focus:outline-none"
            @click="
              changeSlide(
                activeIndex === 0 ? 1 : activeIndex === 4 ? 0 : activeIndex + 1
              )
            "
          >
            <ArrowRightIcon class="w-6 text-white" />
          </button>
        </div>
        <HeroPresentationSliderItem
          :featured="featured"
          :static-index="i"
          :active-index="activeIndex"
          @change-slide="changeSlide"
          @active-showcases-change="activeShowcases = $event"
        />
        <!-- <div>{{ showcase }}</div> -->
        <!-- <div class="bg-red-500 w-full h-full absolute top-0 left-0"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg?inline'
import ArrowRightIcon from '@/assets/icons/arrow-right.svg?inline'

export default {
  components: {
    ArrowLeftIcon,
    ArrowRightIcon
  },
  props: {
    featured: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: 2,
      activeShowcases: []
    }
  },
  computed: {
    activeShowcase() {
      return this.featured[this.activeIndex ? this.activeIndex : 2]
    }
  },
  mounted() {
    const heroPresentationSlider = this.$refs['hero-presentation-slider']
    this.$gsap.fromTo(
      heroPresentationSlider,
      {
        opacity: 0,
        scale: 0.75,
        y: '15px'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        delay: 0.9,
        ease: 'power4.inOut'
      }
    )
  },
  methods: {
    changeSlide(i) {
      if (this.activeShowcases.length > 1) return
      this.activeIndex = i
    }
  }
}
</script>

<style>
.slide-1 {
  left: -15%;
  top: 0;
  z-index: 8;
}
.slide-2 {
  left: 0;
  top: 0;
  z-index: 9;
}

.slide-3 {
  z-index: 10;
}

.slide-4 {
  right: 0;
  top: 0;
  z-index: 9;
}
.slide-5 {
  right: -15%;
  top: 0;
  z-index: 8;
}

.slide-1,
.slide-5 {
  transform: scale(0.5);
}
.slide-2,
.slide-4 {
  transform: scale(0.75);
}
</style>
