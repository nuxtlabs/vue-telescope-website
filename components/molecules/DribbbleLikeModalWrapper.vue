<template>
  <div class="modal-wrapper">
    <div class="w-full h-full overflow-auto" @click.self="$emit('close')">
      <div class="h-full pointer-events-none flex justify-end flex-col pt-28">
        <div
          ref="hack-safari"
          class="rounded-4xl rounded-b-none overflow-hidden"
        >
          <div
            ref="modal-wrapper"
            class="surface h-full pointer-events-auto rounded-4xl rounded-b-none relative px-4"
          >
            <div
              ref="close-button"
              class="absolute top-0 right-0 z-10 p-8 cursor-pointer pointer-events-auto"
              @click="$emit('close')"
            >
              <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
            </div>
            <div class="relative flex justify-between items-center mb-8">
              <div class="pl-2 text-five leading-five font-bold-body-weight">
                {{ label }}
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
import { mapState } from 'vuex'
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  props: {
    label: {
      type: String,
      default: null
    }
  },
  components: {
    XmarkCircleIcon
  },
  computed: {
    ...mapState({
      browser: (state) => state.browser
    })
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
      if (this.browser === 'Safari') {
        this.$refs['modal-wrapper'].style.height = 'calc(100vh - 7rem)'
      }
      this.$gsap.from(this.$refs['modal-wrapper'], {
        y: '100%',
        // opacity: 0,
        duration: 1,
        ease: 'expo.out',
        // clearProps: true,
        onComplete: () => {
          // this.$refs['hack-safari'].style.height = '100%'
          // this.$refs['modal-wrapper'].style.height = '100%'
          this.$refs['modal-wrapper'].style.paddingRight = null
          this.$refs['modal-wrapper'].classList.add('overflow-auto') // md:overflow-hidden overflow-x-hidden
        }
      })
    }
  }
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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  /* backdrop-filter: blur(18px); */
  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.surface {
  position: relative;
  background: white;
  &:before {
    content: '';
    position: sticky;
    display: block;
    width: 100%;
    height: 2rem;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 50%,
      rgba(255, 255, 255, 1) 100%
    );
  }
}
</style>
