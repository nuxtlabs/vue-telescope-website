<template>
  <div class="modal-wrapper">
    <div ref="scrimEl" class="scrim" style="opacity: 0"></div>
    <div class="w-full h-full overflow-auto" @click.self="emit('close')">
      <!-- <div class="w-full flex pointer-events-none">
        <div
          class="ml-auto p-8 cursor-pointer pointer-events-auto"
          @click="$router.push('/explore')"
        >
          <XmarkCircleIcon class="text-white" />
        </div>
      </div> -->

      <div class="h-full md:h-auto md:m-4 pointer-events-none">
        <div
          ref="modalContainerEl"
          style="opacity: 0"
          :class="[
            compact
              ? 'max-w-readable'
              : 'max-w-readable xl:max-w-container min-h-screen'
          ]"
          class="pointer-events-auto h-full relative md:h-auto bg-white m-auto md:mt-12 md:rounded-xl overflow-auto md:overflow-hidden overflow-x-hidden shadow-lg"
        >
          <div
            class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
            @click="emit('close')"
          >
            <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
          </div>
          <div class="">
            <slot></slot>
          </div>
        </div>
      </div>

      <!-- <div v-else-if="loading" class="flex h-full items-center justify-center">
        <TheSquareLogo class="w-10 h-10 mr-2 text-grey-900" />
        <span class="text-six font-bold-body-weight">Loading...</span>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg'
const { setModal } = useModal()

const emit = defineEmits(['close'])

setModal(true)

onUnmounted(() => {
  setModal(false)
})

defineProps({
  fetched: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const { isMobile } = useUserAgent()
const { $gsap } = useNuxtApp()

const scrimEl = ref(null)
const modalContainerEl = ref(null)

function blockBodyScroll() {
  const scrollBarGap = window.innerWidth - document.documentElement.clientWidth
  // document.querySelector('#explore-showcases-section').style.filter =
  //   'blur(18px)'
  // document.querySelector('#main-footer').style.filter = 'blur(18px)'
  // document.querySelector('#main-header').style.filter = 'blur(18px)'
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollBarGap}px`
  document.querySelector(
    '#main-header'
  ).style.paddingRight = `${scrollBarGap}px`
}
function unblockBodyScroll() {
  // document.querySelector('#explore-showcases-section').style.filter = null
  // document.querySelector('#main-footer').style.filter = null
  // document.querySelector('#main-header').style.filter = null
  setTimeout(() => {
    document.body.style.overflow = null
    document.body.style.paddingRight = null
    document.querySelector('#main-header').style.paddingRight = null
  }, 16)
}
function activateEscapeListener() {
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      // this.$router.push('/explore')
      emit('close')
    }
  }
  document.addEventListener('keydown', escapeHandler)
  // TODO
  // this.$once('hook:deactivated', () => {
  //   document.removeEventListener('keydown', escapeHandler)
  // })
}
function animateEnter() {
  if (!isMobile.value) {
    $gsap.fromTo(
      scrimEl.value,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.2,
        ease: 'none',
        onComplete: () => {}
      }
    )
  }

  // old
  $gsap.set(modalContainerEl.value, {
    transformOrigin: 'bottom',
    opacity: 1
  })
  $gsap.from(modalContainerEl.value, {
    // scaleY: 0.99,
    opacity: 0,
    y: -10,
    scale: 0.97,
    // x: 10,
    duration: 0.2,
    // ease: biggerThanMd ? 'back.out(1.7)' : 'expo.outIn',
    ease: 'none'
  })
}

onMounted(() => {
  activateEscapeListener()
  setTimeout(() => {
    animateEnter()
  }, 32)

  blockBodyScroll()
})

onBeforeUnmount(() => {
  unblockBodyScroll()
})
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.42); */
  /*background-color: rgba(0, 0, 0, 0.2);*/
  z-index: 1000;
  /*backdrop-filter: blur(18px);*/
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
  z-index: -1;
  backdrop-filter: blur(18px);
  pointer-events: none;
}
</style>
