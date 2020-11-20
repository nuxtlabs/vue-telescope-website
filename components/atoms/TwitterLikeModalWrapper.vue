<template>
  <div class="modal-wrapper" :class="blur ? ['blur'] : []">
    <div class="w-full h-full overflow-auto" @click.self="$emit('close')">
      <!-- <div class="w-full flex pointer-events-none">
        <div
          class="ml-auto p-8 cursor-pointer pointer-events-auto"
          @click="$router.push('/explore')"
        >
          <XmarkCircleIcon class="text-white" />
        </div>
      </div> -->
      <div v-if="fetched" class="h-full md:h-auto md:m-4 pointer-events-none">
        <div
          ref="modal-wrapper"
          class="pointer-events-auto h-full relative md:h-auto bg-white m-auto max-w-readable-line-length xl:max-w-container-max-width md:mt-12 md:rounded-xl overflow-auto md:overflow-hidden overflow-x-hidden"
        >
          <div
            ref="close-button"
            class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
            @click="$emit('close')"
          >
            <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
          </div>
          <div ref="modal-content" class="">
            <slot></slot>
          </div>
        </div>
      </div>
      <div v-else-if="loading" class="flex h-full items-center justify-center">
        <TheSquareLogo class="w-10 h-10 mr-2 text-grey-900" />
        <span class="text-six font-bold-body-weight">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import TheSquareLogo from '@/assets/logo/square-logo.svg?inline'
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  components: {
    TheSquareLogo,
    XmarkCircleIcon
  },
  props: {
    fetched: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  watch: {
    fetched(value) {
      if (value) {
        this.$nextTick(() => {
          // this.animateEnter()
        })
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = true
    }, 200)
    this.activateEscapeListener()
    // this.$store.commit('SET_MODAL', true)
    // if (this.fetched) {
    //   this.animateEnter()
    // }
    this.blockBodyScroll()
  },
  // activated() {
  //   this.activateEscapeListener()
  //   // this.$store.commit('SET_MODAL', true)
  //   if (this.fetched) {
  //     this.animateEnter()
  //   }
  //   this.blockBodyScroll()
  // },
  beforeDestroy() {
    this.$store.commit('SET_MODAL', false)
    this.unblockBodyScroll()
  },
  // deactivated() {
  //   this.$store.commit('SET_MODAL', false)
  //   this.unblockBodyScroll()
  // },
  methods: {
    blockBodyScroll() {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth
      // document.querySelector('#explore-showcases-section').style.filter =
      //   'blur(18px)'
      // document.querySelector('#main-footer').style.filter = 'blur(18px)'
      // document.querySelector('#main-header').style.filter = 'blur(18px)'
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarGap}px`
      document.querySelector(
        '#main-header'
      ).style.paddingRight = `${scrollBarGap}px`
    },
    unblockBodyScroll() {
      // document.querySelector('#explore-showcases-section').style.filter = null
      // document.querySelector('#main-footer').style.filter = null
      // document.querySelector('#main-header').style.filter = null
      setTimeout(() => {
        document.body.style.overflow = null
        document.body.style.paddingRight = null
        document.querySelector('#main-header').style.paddingRight = null
      })
    },
    activateEscapeListener() {
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          // this.$router.push('/explore')
          this.$emit('close')
        }
      }
      document.addEventListener('keydown', escapeHandler)
      this.$once('hook:deactivated', () => {
        document.removeEventListener('keydown', escapeHandler)
      })
    },
    animateEnter() {
      this.$gsap.set(this.$refs['modal-wrapper'], {
        transformOrigin: 'top'
      })
      // this.$gsap.set(this.$refs['modal-content'], {
      //   opacity: 0
      // })
      // this.$gsap.set(this.$refs['close-button'], {
      //   scale: 0
      // })
      // this.$gsap.from(this.$refs['modal-wrapper'], {
      //   opacity: 0,
      //   duration: 0.4,
      //   ease: 'none'
      // })
      this.$gsap.from(this.$refs['modal-wrapper'], {
        // scaleY: 0.5,
        opacity: 0,
        y: -10,
        duration: 0.75,
        ease: 'expo.inOut',
        onComplete: () => {
          // this.$gsap.fromTo(
          //   this.$refs['modal-content'],
          //   {
          //     opacity: 0
          //   },
          //   {
          //     opacity: 1,
          //     duration: 0.3,
          //     clearProps: true
          //   }
          // )
          // this.$gsap.fromTo(
          //   this.$refs['close-button'],
          //   {
          //     scale: 0
          //   },
          //   {
          //     scale: 1,
          //     duration: 0.5,
          //     clearProps: true,
          //     ease: 'elastic.inOut(1.5, 0.5)'
          //   }
          // )
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
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
.blur {
  backdrop-filter: blur(18px);
}
</style>
