<template>
  <div class="modal-wrapper">
    <div ref="scrimEl" class="scrim" style="opacity: 0" />
    <!-- <div class="fixed top-0 bg-white">{{ test }}</div> -->
    <div
      class="w-full h-full overflow-auto"
      @click.self="animateLeave"
      @touchmove.self="touchMoveHandler"
      @touchstart.self="touchStartHandler"
    >
      <div class="flex flex-col justify-end h-full pt-16 pointer-events-none">
        <div
          ref="hack-safari"
          class="hack-safari overflow-hidden rounded-b-none rounded-4xl"
          :class="isSafari && 'h-full'"
        >
          <div
            ref="modalContainerEl"
            style="transform: translateY(100%)"
            class="modal-container relative h-full px-4 bg-white rounded-b-none pointer-events-auto modal-container rounded-4xl"
          >
            <div
              ref="close-button"
              class="sticky top-0 left-0 z-10 flex items-center justify-center w-full py-4 bg-white rounded-md cursor-pointer pointer-events-auto sticky-edge"
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
            <div ref="modal-content" class="">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg'

const { isMobile, isSafari } = useUserAgent()
const { setModal } = useModal()
const { $gsap } = useNuxtApp()

defineProps({
  label: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['close'])

const modalContainerEl = ref(null)
const scrimEl = ref(null)

const yStart = ref(null)
const xStart = ref(null)

onMounted(() => {
  activateEscapeListener()

  setModal(true)
  animateEnter()

  blockBodyScroll()
})

onUnmounted(() => {
  setModal(false)

  setTimeout(() => {
    document.body.style.overflow = null
    document.body.style.paddingRight = null
    document.querySelector('#main-header').style.paddingRight = null
  })
})

function activateEscapeListener () {
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      // eslint-disable-next-line no-unused-expressions
      animateLeave
    }
  }
  document.addEventListener('keydown', escapeHandler)
  // TODO: move to composable
  // this.$once('hook:destroyed', () => {
  //   document.removeEventListener('keydown', escapeHandler)
  // })
}

function blockBodyScroll () {
  const scrollBarGap = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollBarGap}px`
  document.querySelector(
    '#main-header'
  ).style.paddingRight = `${scrollBarGap}px`

  modalContainerEl.value.style.paddingRight = `calc(1rem + ${scrollBarGap}px)`
}

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
  $gsap.fromTo(
    scrimEl.value,
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.2,
      ease: 'none',
      onComplete: () => {
        if (isSafari.value) {
          modalContainerEl.value.style.height = 'calc(100vh - 4rem)'
        }
        $gsap.to(modalContainerEl.value, {
          y: 0,
          // opacity: 0,
          duration: 1,
          ease: 'expo.out',
          clearProps: true,
          onComplete: () => {
            // this.$refs['hack-safari'].style.height = '100%'
            // modalContainerEl.value.style.height = '100%'
            modalContainerEl.value.style.paddingRight = null
            modalContainerEl.value.classList.add('overflow-auto') // md:overflow-hidden overflow-x-hidden
          }
        })
      }
    }
  )
}

function animateLeave () {
  $gsap.to(scrimEl.value, {
    opacity: 0,
    duration: 0.25
  })

  $gsap.to(modalContainerEl.value, {
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
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.42); */
  /* background-color: rgba(0, 0, 0, 0.4); */
  z-index: 1000;
  /* backdrop-filter: blur(18px); */
  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.scrim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  /* z-index: 1000; */
  backdrop-filter: var(--scrim-filter);
  pointer-events: none;
}

.sticky-edge {
  /* position: relative; */
  /* background: white; */
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
