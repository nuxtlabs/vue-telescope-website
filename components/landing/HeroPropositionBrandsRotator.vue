<script setup lang="ts">
import { useNuxtApp, computed, ref, onMounted } from '#imports'

const brand = ref()

const { $gsap, $config } = useNuxtApp()

const timeout = 5000
const rotationInterval = ref(null)
const brands = ref([
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
])

const activeBrands = computed(() => {
  return brands.value.filter(b => b.active)
})

function enterTransition (el, done = () => {}) {
  $gsap.fromTo(
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
  image.src = `${$config.iconsURL}/${activeBrands.value[0].imgPath}`

  image.addEventListener('load', () => {
    Array.from(el.children[1].children).forEach((c: object, i) => {
      $gsap.to(c, {
        x: `${$gsap.utils.random(-50, 50)}vw`,
        y: `${$gsap.utils.random(-50, 50)}vh`,
        scale: $gsap.utils.random(1, 3),
        rotation: $gsap.utils.random(-20, 20),
        opacity: $gsap.utils.random(0.05, 0.4),
        duration: 0.5,
        delay: 0.005 * i,
        ease: 'power2.inOut'
      })
    })
  })
  // image.addEventListener('error', () => {})
}

function leaveTransition (el, done) {
  $gsap.fromTo(
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

function rotateBrands () {
  let currentEl = 0
  let el = brands.value[currentEl]

  rotationInterval.value = setInterval(() => {
    if (document.hidden) { return }
    el.active = false
    currentEl = (currentEl + 1) % brands.value.length

    el = brands.value[currentEl]
    el.active = true
  }, timeout)
}

onMounted(() => {
  rotateBrands()
  setTimeout(() => enterTransition(brand.value), 100)
})
</script>

<template>
  <span class="block relative w-full h-18">
    <Transition
      appear
      :css="false"
      @enter="enterTransition"
      @leave="leaveTransition"
    >
      <div
        ref="brand"
        :key="activeBrands[0].slug"
        class="brand"
        :class="`text-${activeBrands[0].slug}-base`"
      >
        <span>{{ activeBrands[0].name }}</span>
        <div class="brand-icon-wrapper">
          <div
            v-for="num in 20"
            :key="num"
            class="brand-icon"
            :class="[num % 2 && 'hidden md:block']"
            :style="`background-image: url(${$config.iconsURL}/${activeBrands[0].imgPath})`"
          />
        </div>
      </div>
    </Transition>
  </span>
</template>

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
