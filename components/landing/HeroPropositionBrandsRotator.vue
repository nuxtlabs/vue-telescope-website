<template>
  <span class="block relative w-full h-18">
    <Transition
      appear
      :css="false"
      @enter="enterTransition"
      @leave="leaveTransition"
    >
      <div
        ref="brandRef"
        :key="activeBrands[0].slug"
        class="w-full absolute top-0 left-0 opacity-0"
        :class="`text-${activeBrands[0].slug}-base`"
      >
        <span>{{ activeBrands[0].name }}</span>

        <div class="absolute -z-[1] w-[2rem] h-[2rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            v-for="num in 20"
            :key="num"
            class="absolute w-[2rem] h-[2rem] top-0 left-0 bg-no-repeat bg-center bg-contain opacity-0"
            :class="[num % 2 && 'hidden md:block']"
            :style="`background-image: url(${config.iconsURL}/${activeBrands[0].imgPath})`"
          />
        </div>
      </div>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { animate, stagger, timeline } from 'motion'

const brandRef = ref()

const config = useRuntimeConfig().public

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

function randomNumber (min, max) {
  return Math.random() * (max - min) + min
}

const activeBrands = computed(() => {
  return brands.value.filter(b => b.active)
})

function enterTransition (el, done = () => {}) {
  timeline([
    [el, { opacity: 0, scale: 0.5, filter: 'blur(20px)' }, { duration: 0 }],
    [el, { opacity: 1, scale: 1, filter: 'blur(0px)' }, { duration: 0.5, easing: 'ease-in-out' }]
  ])

  const image = new Image()
  image.src = `${config.iconsURL}/${activeBrands.value[0]?.imgPath}`

  image.addEventListener('load', () => {
    Array.from(el.children[1]?.children).forEach((c: HTMLElement) => {
      animate(c, {
        x: `${randomNumber(-50, 50)}vw`,
        y: `${randomNumber(-50, 50)}vh`,
        scale: randomNumber(1, 3),
        rotate: randomNumber(-20, 20),
        opacity: randomNumber(0.05, 0.4)
      }, { duration: 0.5, delay: stagger(0.05), easing: 'ease-in-out' })
    })
  })

  // TODO: complete event
  // setTimeout(() => {
  //   done()
  // }, 500)
  // image.addEventListener('error', () => {})
}

function leaveTransition (el, done) {
  animate(el, { opacity: 0, scale: 0.5, filter: 'blur(20px)' }, { duration: 0.5, easing: 'ease-in-out' })
  // TODO: complete event
  setTimeout(() => {
    done()
  }, 500)
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
  setTimeout(() => enterTransition(brandRef.value), 100)
})
</script>
