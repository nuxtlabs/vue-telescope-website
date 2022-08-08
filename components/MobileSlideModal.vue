<template>
  <div class="fixed top-0 left-0 w-full h-full z-[1000]">
    <div ref="scrimRef" class="scrim fixed top-0 left-0 w-full h-full pointer-events-none" style="opacity: 0" />
    <div
      class="w-full h-full overflow-auto"
      @click.self="animateLeave"
      @touchmove.self="touchMoveHandler"
      @touchstart.self="touchStartHandler"
    >
      <div class="flex flex-col justify-end h-full pt-16 pointer-events-none">
        <div
          class="overflow-hidden rounded-b-none rounded-4xl"
          :class="isSafari && 'h-full'"
        >
          <div
            ref="modalContainerRef"
            style="transform: translateY(100%)"
            class="modal-container overflow-auto relative h-full px-4 bg-white rounded-b-none pointer-events-auto rounded-4xl"
          >
            <div
              class="sticky-edge sticky top-0 left-0 z-10 flex items-center justify-center w-full py-4 bg-white rounded-md cursor-pointer pointer-events-auto"
              @click="isMobile ? null : animateLeave()"
              @touchmove="touchMoveHandler"
              @touchstart="touchStartHandler"
            >
              <!-- <XmarkCircleIcon class="w-6 h-6 text-grey-900" /> -->
              <div class="w-24 h-1 rounded bg-grey-300" />
            </div>
            <div
              class="relative flex items-center justify-between mt-2 mb-4 pointer-events-none"
            >
              <div class="pl-2 text-six leading-six font-bold-body-weight">
                {{ label }}
              </div>
            </div>
            <div>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg'

const { isMobile, isSafari } = useUserAgent()
const { setModal } = useModal()
const { $gsap } = useNuxtApp()
const { bodyLock, bodyUnlock } = useBodyLock()

defineProps({
  label: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close'])

const modalContainerRef = ref(null)
const scrimRef = ref(null)

const yStart = ref(null)
const xStart = ref(null)

useEsc(animateLeave)

onMounted(() => {
  setModal(true)
  setTimeout(() => {
    animateEnter()
  })

  bodyLock()
})

onUnmounted(() => {
  setModal(false)
  bodyUnlock()
})

function touchStartHandler (e) {
  yStart.value = e.touches[0].clientY
  xStart.value = e.touches[0].clientX
}

function touchMoveHandler (e) {
  if (!yStart.value || !xStart.value) {
    return
  }

  const xCurrent = e.touches[0].clientX
  const yCurrent = e.touches[0].clientY

  const xDiff = xStart.value - xCurrent
  const yDiff = yStart.value - yCurrent

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      // left swipe
    } else {
      // right swipe
    }
  } else if (yDiff > 0) {
    // up swipe
  } else {
    // down swipe
    // this.$emit('close')
    animateLeave()
  }
  // reset
  xStart.value = null
  yStart.value = null
}

function animateEnter () {
  setTimeout(() => {
    $gsap.fromTo(
      scrimRef.value,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'none',
        onComplete: () => {
          if (isSafari.value) {
            modalContainerRef.value.style.height = 'calc(100vh - var(--header-height))'
          }
          $gsap.to(modalContainerRef.value, {
            y: 0,
            // opacity: 0,
            duration: 1,
            ease: 'expo.out',
            clearProps: true
          })
        }
      }
    )
  }, 100)
}

function animateLeave () {
  $gsap.to(scrimRef.value, {
    opacity: 0,
    duration: 0.25
  })

  $gsap.to(modalContainerRef.value, {
    y: '100%',
    duration: 0.25,
    ease: 'expo.out',
    onComplete: () => {
      emit('close')
    }
  })
}
</script>

<style lang="postcss" scoped>
.scrim {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: var(--scrim-filter);
}

.sticky-edge {
  &:before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 1rem;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transform: translateY(100%);
    /* border-radius: 8px; */
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      /* rgba(255, 255, 255, 1) 50%, */ rgba(255, 255, 255, 1) 100%
    );
  }
}
</style>
