<template>
  <div class="fixed top-0 left-0 w-full h-full z-[1000]">
    <div ref="scrimEl" class="scrim fixed top-0 left-0 w-full h-full -z-[1] pointer-events-none" style="opacity: 0" />
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
          <div>
            <slot />
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
const { bodyLock, bodyUnlock } = useBodyLock()

useEsc(() => emit('close'))

const scrimEl = ref(null)
const modalContainerEl = ref(null)

function animateEnter () {
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
    ease: 'none'
  })
}

onMounted(() => {
  setTimeout(() => {
    animateEnter()
  }, 32)

  bodyLock()
})

onBeforeUnmount(() => {
  bodyUnlock()
})
</script>

<style scoped>
.scrim {
  backdrop-filter: var(--scrim-filter);
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
