<template>
  <div
    ref="backgroundRef"
    class="absolute top-0 left-0 w-full h-full flex flex-col rounded-xl"
  >
    <div class="flex p-4 pb-0">
      <div
        class="absolute bottom-0 left-1/2 z-10 sm:top-0 sm:left-0 transform -translate-x-1/2 translate-y-1/2 sm:translate-x-0 sm:translate-y-0 w-48 p-4 sm:-ml-16 sm:-mt-12"
      >
        <svg
          class="w-full overflow-visible"
          viewBox="0 0 85 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g ref="contentRef">
            <path
              class="opacity-0"
              d="M48.2888 21.4482H33.8647C32.384 21.4482 31.1836 22.6486 31.1836 24.1293C31.1836 25.61 32.384 26.8104 33.8647 26.8104H48.2888C49.7696 26.8104 50.9699 25.61 50.9699 24.1293C50.9699 22.6486 49.7696 21.4482 48.2888 21.4482Z"
              :fill="onSurfaceColor"
            />
            <path
              class="opacity-0"
              d="M24.6391 21.4482H21.4487C19.9679 21.4482 18.7676 22.6486 18.7676 24.1293C18.7676 25.61 19.9679 26.8104 21.4487 26.8104H24.6391C26.1198 26.8104 27.3202 25.61 27.3202 24.1293C27.3202 22.6486 26.1198 21.4482 24.6391 21.4482Z"
              :fill="onSurfaceColor"
            />
            <path
              class="opacity-0"
              d="M35.8728 42.897H21.4487C19.9679 42.897 18.7676 44.0973 18.7676 45.578C18.7676 47.0588 19.9679 48.2591 21.4487 48.2591H35.8728C37.3535 48.2591 38.5539 47.0588 38.5539 45.578C38.5539 44.0973 37.3535 42.897 35.8728 42.897Z"
              :fill="onSurfaceColor"
            />
            <path
              class="opacity-0"
              d="M48.2602 42.897H45.0697C43.589 42.897 42.3887 44.0973 42.3887 45.578C42.3887 47.0588 43.589 48.2591 45.0697 48.2591H48.2602C49.7409 48.2591 50.9413 47.0588 50.9413 45.578C50.9413 44.0973 49.7409 42.897 48.2602 42.897Z"
              :fill="onSurfaceColor"
            />
            <path
              class="opacity-0"
              d="M40.2162 32.1724H21.4487C19.9679 32.1724 18.7676 33.3727 18.7676 34.8534C18.7676 36.3342 19.9679 37.5345 21.4487 37.5345H40.2162C41.6969 37.5345 42.8972 36.3342 42.8972 34.8534C42.8972 33.3727 41.6969 32.1724 40.2162 32.1724Z"
              :fill="onSurfaceColor"
            />
          </g>
          <g ref="searchRef" class="draw">
            <path
              pathLength="1"
              stroke-width="2"
              :stroke="onSurfaceColor"
              d="M34.854 0C15.6047 0 0 15.6047 0 34.854C0 54.1033 15.6047 69.7079 34.854 69.7079C54.1033 69.7079 69.7079 54.1033 69.7079 34.854C69.7079 25.6101 66.0358 16.7449 59.4994 10.2085C52.9631 3.6721 44.0978 0 34.854 0ZM34.854 64.3458C18.5661 64.3458 5.36215 51.1418 5.36215 34.854C5.36215 18.5661 18.5661 5.36215 34.854 5.36215C51.1418 5.36215 64.3458 18.5661 64.3458 34.854C64.3458 51.1418 51.1418 64.3458 34.854 64.3458Z"
              fill="rgba(79, 196, 255, 0.01)"
            />
            <path
              pathLength="1"
              stroke-width="2"
              :stroke="onSurfaceColor"
              d="M83.105 79.3045L66.2323 62.4318C65.1853 61.3848 63.4878 61.3848 62.4407 62.4318C61.3937 63.4789 61.3937 65.1764 62.4407 66.2234L79.3134 83.0961C80.3604 84.1431 82.058 84.1431 83.105 83.0961C84.152 82.0491 84.152 80.3515 83.105 79.3045Z"
              fill="rgba(79, 196, 255, 0.01)"
            />
          </g>
        </svg>
      </div>
      <h3
        ref="textRef"
        class="h-auto relative p-4 sm:ml-24 text-eight leading-eight"
      >
        {{ description }}
      </h3>
    </div>

    <div class="flex-1 relative w-full h-full overflow-hidden">
      <div
        ref="imageRef"
        class="absolute top-0 left-0 w-full h-full bg-100 bg-no-repeat bg-top"
        :style="`background-image: url('https://res.cloudinary.com/nuxt/image/upload/f_auto,q_auto/remote/vt${image}');`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate, timeline, stagger } from 'motion'

const draw = progress => ({
  strokeDashoffset: 1 - progress,
  visibility: 'visible'
})

const props = defineProps({
  surfaceColor: {
    type: String,
    default: ''
  },
  onSurfaceColor: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  }
})

const backgroundRef = ref(null)
const contentRef = ref(null)
const searchRef = ref(null)
const textRef = ref(null)
const imageRef = ref(null)

defineExpose({
  leave
})

const enterBgDuration = 0.75

onMounted(() => {
  // Background
  timeline([
    [backgroundRef.value, { backgroundColor: 'transparent' }, { duration: 0 }],
    [backgroundRef.value, { backgroundColor: props.surfaceColor }, { duration: enterBgDuration, easing: 'linear' }]
  ])

  // SVG
  timeline([
    [searchRef.value?.children, draw(1), { duration: 0.75, delay: 0.5, easing: 'ease-out' }],
    [searchRef.value?.children, { fill: props.onSurfaceColor }, { duration: 0.25, easing: 'linear', at: '-0.5' }],
    [contentRef.value?.children, { opacity: 0, scale: 0.95 }, { duration: 0 }],
    [contentRef.value?.children, { opacity: 1, scale: 1 }, { duration: 0.1, delay: stagger(0.05), easing: 'ease-out' }]
  ])

  // Text
  timeline([
    [textRef.value, { opacity: 0, filter: 'blur(20px)' }, { duration: 0 }],
    [textRef.value, { opacity: 1, filter: 'blur(0px)' }, { duration: 0.75, easing: 'ease-in' }]
  ])

  // Image
  timeline([
    [imageRef.value, { y: '25px', opacity: 0 }, { duration: 0 }],
    [imageRef.value, { y: 0, opacity: 1 }, { duration: 0.75, delay: 0.25, easing: 'ease-in-out' }]
  ])
})

function leave () {
  return new Promise<void>((resolve) => {
    try {
      // SVG
      animate(contentRef.value?.children, { opacity: 0, scale: 0.95 }, { duration: 0.25, delay: stagger(0.025), easing: 'ease-in' })
      timeline([
        [searchRef.value?.children, { fill: 'transparent' }, { duration: 0.2, easing: 'linear' }],
        [searchRef.value?.children, draw(0), { duration: 0.5, easing: [0, 1, 1, 1] }]
      ])

      // Text
      animate(textRef.value, { opacity: 0, filter: 'blur(20px)' }, { duration: 0.5, easing: 'ease-in' })
      // TODO: complete event
      setTimeout(() => {
        resolve()
      }, 500)

      // Image
      animate(imageRef.value, {
        y: '25px',
        opacity: 0
      }, { duration: 0.25, easing: 'ease-in' })
    } catch (err) {
      resolve()
    }
  })
}
</script>

<style scoped>
.draw path {
  fill: transparent;
  /* stroke: white; */
  stroke-width: 1px;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  visibility: hidden;
}
</style>
