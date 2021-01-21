<template>
  <span class="block relative w-full h-18">
    <transition
      appear
      :css="false"
      @enter="enterTransition"
      @leave="leaveTransition"
    >
      <div
        v-for="brand in activeBrands"
        :key="brand.slug"
        class="brand"
        :class="`text-${brand.slug}-base`"
      >
        <span>{{ brand.name }}</span>
        <div class="brand-icon-wrapper">
          <div
            v-for="num in 20"
            :key="num"
            class="brand-icon"
            :class="[num % 2 && 'hidden md:block']"
            :style="`background-image: url(${$config.iconsURL}/${brand.imgPath})`"
          ></div>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  data() {
    return {
      timeout: 5000,
      rotationInterval: null,
      brands: [
        { slug: 'vue', name: 'Vue.js', active: true, imgPath: '/vue.svg' },
        {
          slug: 'nuxtjs',
          name: 'Nuxt.js',
          active: false,
          imgPath: '/framework/nuxt.svg'
        },
        {
          slug: 'gridsome',
          name: 'Gridsome',
          active: false,
          imgPath: '/framework/gridsome.svg'
        },
        {
          slug: 'quasar',
          name: 'Quasar',
          active: false,
          imgPath: '/framework/quasar.svg'
        },
        {
          slug: 'vuepress',
          name: 'Vuepress',
          active: false,
          imgPath: '/framework/vuepress.svg'
        }
      ]
    }
  },
  computed: {
    activeBrands() {
      return this.brands.filter((b) => b.active)
    }
  },
  mounted() {
    // this.brands.map(
    //   (brand) =>
    //     (new Image().src = `https://icons.vuetelemetry.com${brand.imgPath}`)
    // )

    this.rotateBrands()
  },
  beforeDestroy() {
    clearInterval(this.rotationInterval)
  },
  methods: {
    rotateBrands() {
      let currentEl = 0
      let el = this.brands[currentEl]

      this.rotationInterval = setInterval(() => {
        if (document.hidden) return
        el.active = false
        currentEl = (currentEl + 1) % this.brands.length

        el = this.brands[currentEl]
        el.active = true
      }, this.timeout)
    },
    enterTransition(el, done) {
      this.$gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.5
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power4.inOut',
          onComplete: () => {
            done()
          }
        }
      )

      const image = new Image()
      image.src = `${this.$config.iconsURL}/${this.activeBrands[0].imgPath}`

      image.addEventListener('load', () => {
        Array.from(el.children[1].children).forEach((c, i) => {
          this.$gsap.to(c, {
            x: `${this.$gsap.utils.random(-50, 50)}vw`,
            y: `${this.$gsap.utils.random(-50, 50)}vh`,
            scale: this.$gsap.utils.random(1, 3),
            rotation: this.$gsap.utils.random(-20, 20),
            opacity: this.$gsap.utils.random(0.05, 0.4),
            duration: 0.5,
            delay: 0.005 * i,
            ease: 'power2.inOut'
          })
        })
      })
      // image.addEventListener('error', () => {})
    },
    leaveTransition(el, done) {
      this.$gsap.fromTo(
        el,
        {
          opacity: 1,
          scale: 1
        },
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.5,
          ease: 'power4.inOut',
          onComplete: () => {
            done()
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.brand {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.brand-icon-wrapper {
  position: absolute;
  z-index: -1;
  width: 2rem;
  height: 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.brand-icon {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 0;
  left: 0;
  /* transform: translate(-50%, -50%); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0;
}
</style>
