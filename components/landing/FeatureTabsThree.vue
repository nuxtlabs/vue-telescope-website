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
          viewBox="0 0 74 73"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref="arrowRef"
            pathLength="1"
            d="M48.3628 17.6839C47.6749 16.8512 46.4501 16.7152 45.5962 17.3766L42.5369 19.7462C41.2226 20.7642 39.3122 19.8275 39.3122 18.1651V2C39.3122 0.895429 38.4167 0 37.3122 0H36.6872C35.5826 0 34.6872 0.89543 34.6872 2V18.1576C34.6872 19.8214 32.7741 20.7577 31.4602 19.737L28.4267 17.3805C27.5729 16.7172 26.3465 16.8525 25.6579 17.6861L25.3164 18.0994C24.5978 18.9692 24.7405 20.2609 25.6316 20.9529L35.7741 28.8287C36.4954 29.3888 37.5043 29.3892 38.226 28.8298L48.3884 20.9526C49.2806 20.261 49.424 18.9684 48.7049 18.098L48.3628 17.6839Z"
            :fill="onSurfaceColor"
          />
          <g class="draw">
            <path
              ref="boxRef"
              :stroke="onSurfaceColor"
              pathLength="1"
              d="M50.3314 1.43518C49.4233 0.848391 48.2132 1.08954 47.5995 1.97964L47.3038 2.40837C46.6636 3.33676 46.9172 4.61059 47.8641 5.22306L64.928 16.2602C66.1466 17.0484 66.1463 18.8313 64.9276 19.6192L38.0858 36.9714C37.425 37.3986 36.575 37.3986 35.9142 36.9714L9.07242 19.6192C7.85367 18.8313 7.85345 17.0484 9.07201 16.2602L26.1432 5.21835C27.0873 4.60768 27.3427 3.33897 26.7083 2.41061L26.4211 1.99039C25.8094 1.09527 24.5959 0.850504 23.6851 1.43852L0.915251 16.1382C0.344662 16.5066 0 17.1394 0 17.8185V47.2135C0 47.8924 0.344419 48.525 0.91468 48.8934L35.9147 71.5055C36.5753 71.9323 37.4247 71.9323 38.0853 71.5055L73.0853 48.8934C73.6556 48.525 74 47.8924 74 47.2135V17.818C74 17.1391 73.6556 16.5066 73.0854 16.1382L50.3314 1.43518ZM4.625 25.8086C4.625 24.2238 6.38034 23.2686 7.71109 24.1292L33.7736 40.9841C34.3434 41.3526 34.6875 41.9849 34.6875 42.6635V61.6673C34.6875 63.2526 32.9312 64.2077 31.6005 63.3462L5.53802 46.4718C4.96871 46.1032 4.625 45.4712 4.625 44.7929V25.8086ZM42.3977 63.3295C41.0669 64.1892 39.3125 63.2338 39.3125 61.6495V42.6635C39.3125 41.9849 39.6566 41.3526 40.2264 40.9841L66.2889 24.1292C67.6197 23.2686 69.375 24.2238 69.375 25.8086V44.814C69.375 45.493 69.0305 46.1256 68.4602 46.494L42.3977 63.3295Z"
              fill="rgb(187, 130, 255, 0.01)"
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
import { animate, timeline } from 'motion'

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
const arrowRef = ref(null)
const boxRef = ref(null)
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
    [boxRef.value, draw(1), { duration: 0.75, delay: 0.5, easing: 'ease-out' }],
    [boxRef.value, { fill: props.onSurfaceColor }, { duration: 0.25, easing: 'linear', at: '-0.5' }],
    [arrowRef.value, { y: '-10px', opacity: 0 }, { duration: 0, at: '-0.25' }],
    [arrowRef.value, { y: 0, opacity: 1 }, { duration: 0.25, easing: 'ease-out' }]
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
      animate(arrowRef.value, { y: '-10px', opacity: 0 }, { duration: 0.25, easing: [1, 1, 1, 0.5] })
      timeline([
        [boxRef.value, { fill: 'transparent' }, { duration: 0.2, easing: 'linear' }],
        [boxRef.value, draw(0), { duration: 0.5, easing: [0, 1, 1, 1], at: '-0.2' }]
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
