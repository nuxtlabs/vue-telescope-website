<template>
  <div class="brand-logos-cloud w-12 h-12 opacity-25">
    <ClientOnly>
      <div
        v-for="logo in knuthfisheryates(brands)"
        :key="logo"
        ref="logo"
        class="fuck w-12 h-12 absolute top-0 left-0 rounded-md"
        :class="[`bg-${logo}-light`]"
      >
        <img
          :src="require(`~/assets/brands/${logo}.svg`)"
          alt=""
          class="w-full h-full"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script>
import { knuthfisheryates } from '@/helpers/shuffle'

export default {
  data() {
    return {
      brands: [
        'quasar',
        'tailwind',
        'element',
        'vuetify',
        'bootstrap',
        'buefy',
        'vue',
        'nuxt',
        'gridsome'
      ],
      xMatrix: [-270, -250, -180, -100, 0, 100, 150, 200, 250],
      yMatrix: [-30, -170, -255, -190, -165, -180, -200, -270, -30]
    }
  },
  mounted() {
    // const shuffleX = knuthfisheryates(this.xMatrix)
    // const shuffleY = knuthfisheryates(this.yMatrix)

    // const maxX = document.querySelector('#hero-proposition').getBoundingClientRect()
    setTimeout(() => {
      this.$refs.logo.forEach((logo, i) => {
        this.$gsap.to(logo, {
          // y: `${this.$gsap.utils.random(-50, -700)}%`,
          y: this.yMatrix[i] + this.$gsap.utils.random(-40, 40),
          // x: `${this.$gsap.utils.random(-250, 250)}px`,
          x: this.xMatrix[i] + this.$gsap.utils.random(-20, 20),
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.05 * i,
          // stagger: 0.1,
          ease: 'expo.inOut'
        })
      })
    }, 1000)
    // this.$gsap.to(this.$refs.logo, {
    //   // y: `${this.$gsap.utils.random(-50, -700)}%`,
    //   y: 'random(-50, -700)%',
    //   // x: `${this.$gsap.utils.random(-250, 250)}px`,
    //   x: 'random(-250, 250)px',
    //   opacity: 1,
    //   duration: 0.5,
    //   stagger: 0.1,
    //   ease: 'expo.out'
    // })
  },
  methods: {
    knuthfisheryates
  }
}
</script>

<style scoped>
.brand-logos-cloud {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateY(-100%) translateX(-50%);
  z-index: -1;
}
.fuck {
  transform: scale(0);
  opacity: 0;
}
</style>
