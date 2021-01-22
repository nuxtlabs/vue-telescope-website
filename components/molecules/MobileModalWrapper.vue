<template>
  <div class="modal-wrapper">
    <div ref="scrim" class="scrim" style="opacity: 0"></div>
    <!-- <div class="fixed top-0 bg-white">{{ test }}</div> -->
    <div
      class="w-full h-full overflow-auto"
      @click.self="animateLeave"
      @touchmove.self="touchMoveHandler"
      @touchstart.self="touchStartHandler"
    >
      <div class="h-full pointer-events-none flex justify-end flex-col pt-16">
        <div
          ref="hack-safari"
          class="rounded-4xl rounded-b-none overflow-hidden"
          :class="browser === 'Safari' && 'h-full'"
        >
          <div
            ref="modal-container"
            style="transform: translateY(100%)"
            class="modal-container relative bg-white h-full pointer-events-auto rounded-4xl rounded-b-none relative px-4"
          >
            <div
              @click="isMobile ? null : animateLeave()"
              @touchmove="touchMoveHandler"
              @touchstart="touchStartHandler"
              ref="close-button"
              class="sticky-edge sticky bg-white rounded-md top-0 left-0 z-10 w-full py-4 cursor-pointer pointer-events-auto flex items-center justify-center"
            >
              <!-- <XmarkCircleIcon class="text-grey-900 w-6 h-6" /> -->
              <div class="w-24 h-1 bg-grey-300 rounded"></div>
            </div>
            <div
              class="relative flex justify-between items-center mb-4 mt-2 pointer-events-none"
            >
              <div class="pl-2 text-six leading-six font-bold-body-weight">
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
      browser: (state) => state.browser,
      isModal: (state) => state.isModal,
      isMobile: (state) => state.isMobile
    })
  },
  data() {
    return {
      // test: 0,
      yStart: null,
      xStart: null
    }
  },
  mounted() {
    this.activateEscapeListener()

    this.$store.commit('SET_MODAL', true)
    this.animateEnter()

    this.blockBodyScroll()
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
    activateEscapeListener() {
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          this.animateLeave
        }
      }
      document.addEventListener('keydown', escapeHandler)
      this.$once('hook:destroyed', () => {
        document.removeEventListener('keydown', escapeHandler)
      })
    },
    blockBodyScroll() {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarGap}px`
      document.querySelector(
        '#main-header'
      ).style.paddingRight = `${scrollBarGap}px`

      this.$refs[
        'modal-container'
      ].style.paddingRight = `calc(1rem + ${scrollBarGap}px)`
    },
    touchStartHandler(e) {
      this.yStart = e.touches[0].clientY
      this.xStart = e.touches[0].clientX
    },
    touchMoveHandler(e) {
      if (!this.yStart || !this.xStart) {
        return
      }

      var xCurrent = e.touches[0].clientX
      var yCurrent = e.touches[0].clientY

      var xDiff = this.xStart - xCurrent
      var yDiff = this.yStart - yCurrent

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          // left swipe
        } else {
          // right swipe
        }
      } else {
        if (yDiff > 0) {
          // up swipe
        } else {
          // down swipe
          // this.$emit('close')
          this.animateLeave()
        }
      }
      // reset
      this.xStart = null
      this.yStart = null
    },
    animateEnter() {
      const scrim = this.$refs.scrim
      this.$gsap.fromTo(
        scrim,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.2,
          ease: 'none',
          onComplete: () => {
            if (this.browser === 'Safari') {
              this.$refs['modal-container'].style.height = 'calc(100vh - 7rem)'
            }
            this.$gsap.to(this.$refs['modal-container'], {
              y: 0,
              // opacity: 0,
              duration: 1,
              ease: 'expo.out',
              clearProps: true,
              onComplete: () => {
                // this.$refs['hack-safari'].style.height = '100%'
                // this.$refs['modal-container'].style.height = '100%'
                this.$refs['modal-container'].style.paddingRight = null
                this.$refs['modal-container'].classList.add('overflow-auto') // md:overflow-hidden overflow-x-hidden
              }
            })
          }
        }
      )
    },
    animateLeave() {
      const scrim = this.$refs.scrim
      this.$gsap.to(scrim, {
        opacity: 0,
        duration: 0.25
      })

      this.$gsap.to(this.$refs['modal-container'], {
        y: '100%',
        duration: 0.25,
        ease: 'expo.out',
        onComplete: () => {
          this.$emit('close')
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
  backdrop-filter: blur(18px);
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
