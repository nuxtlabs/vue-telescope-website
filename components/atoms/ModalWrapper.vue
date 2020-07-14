<template>
  <div class="modal-wrapper">
    <div
      class="w-full h-full overflow-auto"
      @click.self="$router.push('/explore')"
    >
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
          class="pointer-events-auto h-full relative md:h-auto bg-white m-auto max-w-readable-line-length md:mt-12 md:rounded-xl overflow-auto md:overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
            @click="$router.push('/explore')"
          >
            <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
          </div>
          <slot></slot>
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
  activated() {
    // const mainContent = document.querySelector('#explore-showcases-section')
    // if (mainContent) {
    //   mainContent.style.filter = 'blur(18px)'
    // }
    document.querySelector('#explore-showcases-section').style.filter =
      'blur(18px)'
    document.querySelector('#main-footer').style.filter = 'blur(18px)'
    document.querySelector('#main-header').style.filter = 'blur(18px)'
    document.body.style.overflow = 'hidden'
  },
  deactivated() {
    document.querySelector('#explore-showcases-section').style.filter = null
    document.querySelector('#main-footer').style.filter = null
    document.querySelector('#main-header').style.filter = null
    document.body.style.overflow = null
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  /* backdrop-filter: blur(18px); */
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
