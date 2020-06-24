<template>
  <div class="w-full relative flex items-center justify-center">
    <div
      v-for="({ id, screenshotUrl }, i) in featured"
      :key="id"
      class="inline-flex w-full md:w-1/2 rounded-md overflow-hidden shadow-md"
      :class="[`slide-${i + 1}`, i === 2 ? 'relative' : 'absolute']"
    >
      <HeroPresentationSliderItem
        :featured="featured"
        :static-index="i"
        :active-index="activeIndex"
        @change-slide="changeSlide"
      />
      <!-- <div>{{ showcase }}</div> -->
      <!-- <div class="bg-red-500 w-full h-full absolute top-0 left-0"></div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    featured: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeIndex: null
    }
  },
  methods: {
    changeSlide(i) {
      // console.log('pizda', i)
      this.activeIndex = i
    }
  }
}
</script>

<style>
.suka {
  position: relative;
  -webkit-overflow-scrolling: touch;
  list-style: none;
  white-space: nowrap;
  margin: 0 0 -20px;
  padding: 0 0 1rem;
  overflow-x: scroll;
  text-align: center;
}

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

.intrinsic {
  padding-bottom: 56.25%;
  position: relative;
}
</style>
