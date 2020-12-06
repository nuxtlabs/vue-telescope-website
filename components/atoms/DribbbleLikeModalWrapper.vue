<template>
  <div class="modal-wrapper">
    <div class="w-full h-full overflow-auto" @click.self="$emit('close')">
      <div class="h-full pointer-events-none flex justify-end flex-col">
        <div
          ref="hack-safari"
          class="rounded-4xl rounded-b-none overflow-hidden mt-28"
        >
          <div
            ref="modal-wrapper"
            class="h-full pointer-events-auto rounded-4xl rounded-b-none relative bg-white p-4"
          >
            <div class="relative flex justify-between items-center">
              <div class="pl-2 text-seven leading-seven font-bold-body-weight">
                Select filters:
              </div>
              <div
                ref="close-button"
                class="p-4 cursor-pointer pointer-events-auto"
                @click="$emit('close')"
              >
                <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
              </div>
            </div>
            <div ref="modal-content" class="">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  components: {
    XmarkCircleIcon
  },
  mounted() {
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.$emit('close')
      }
    }
    document.addEventListener('keydown', escapeHandler)
    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', escapeHandler)
    })

    this.$store.commit('SET_MODAL', true)
    this.animateEnter()
    const scrollBarGap =
      window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarGap}px`
    document.querySelector(
      '#main-header'
    ).style.paddingRight = `${scrollBarGap}px`

    this.$refs[
      'modal-wrapper'
    ].style.paddingRight = `calc(1rem + ${scrollBarGap}px)`
  },
  beforeDestroy() {
    this.$store.commit('SET_MODAL', false)
    setTimeout(() => {
      document.body.style.overflow = null
      document.body.style.paddingRight = null
      document.querySelector('#main-header').style.paddingRight = null
    })
  },
  methods: {
    animateEnter() {
      this.$gsap.from(this.$refs['modal-wrapper'], {
        y: '100%',
        // opacity: 0,
        duration: 1,
        ease: 'expo.out',
        clearProps: true,
        onComplete: () => {
          this.$refs['hack-safari'].style.height = '100%'
          // this.$refs['modal-wrapper'].style.height = '100%'
          this.$refs['modal-wrapper'].style.paddingRight = null
          this.$refs['modal-wrapper'].classList.add('overflow-auto') // md:overflow-hidden overflow-x-hidden
        }
      })
    }
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.42); */
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  /* backdrop-filter: blur(18px); */
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
