<template>
  <div class="fixed top-0 left-0 z-50 w-full h-full">
    <div
      class="absolute top-0 left-0 w-full h-full"
      style="background-color: rgba(0, 0, 0, 0.2); backdrop-filter: blur(12px)"
    />
    <div
      id="tour-main-header"
      class="h-16 absolute top-0 left-0 w-full min-w-body"
    >
      <div
        class="w-full h-full flex justify-end items-center max-w-container m-auto px-4"
      >
        <button
          ref="anchor"
          class="rounded-full overflow-hidden focus:outline-none"
        >
          <svg
            class="w-8 h-8"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="#F5F7F6" />
            <rect x="2" y="11" width="2" height="6" fill="#0BDCA0" />
            <rect x="4" y="9" width="2" height="4" fill="#0BDCA0" />
            <rect x="6" y="9" width="2" height="8" fill="#0BDCA0" />
            <rect x="16" y="9" width="2" height="8" fill="#0BDCA0" />
            <rect x="12" y="9" width="2" height="6" fill="#0BDCA0" />
            <rect x="10" y="9" width="2" height="6" fill="#0BDCA0" />
            <rect
              width="2"
              height="4"
              transform="matrix(1 0 0 -1 8 15)"
              fill="#0BDCA0"
            />
            <rect
              width="3"
              height="2"
              transform="matrix(1 0 0 -1 8 19)"
              fill="#0BDCA0"
            />
            <rect
              width="3"
              height="2"
              transform="matrix(1 0 0 -1 13 19)"
              fill="#0BDCA0"
            />
            <rect
              width="2"
              height="4"
              transform="matrix(1 0 0 -1 14 15)"
              fill="#0BDCA0"
            />
            <rect x="6" y="7" width="12" height="2" fill="#0BDCA0" />
            <rect x="8" y="5" width="2" height="2" fill="#0BDCA0" />
            <rect x="14" y="5" width="2" height="2" fill="#0BDCA0" />
            <rect x="16" y="3" width="2" height="2" fill="#0BDCA0" />
            <rect x="6" y="3" width="2" height="2" fill="#0BDCA0" />
            <rect x="18" y="9" width="2" height="4" fill="#0BDCA0" />
            <rect x="20" y="11" width="2" height="6" fill="#0BDCA0" />
          </svg>
        </button>

        <Popper
          v-if="showTooltip"
          arrow
          :offset-y="12"
          placement="bottom-end"
          :anchor="$refs.anchor"
        >
          <div class="p-4" @click="closeTour">
            <div class="mb-4 font-bold-body-weight">
              Save websites to your own Collections.
            </div>
            <div class="flex items-center justify-end">
              <button
                class="mr-4 text-sm leading-sm"
                @click="featureSeenHandler"
              >
                Not interested
              </button>
              <!-- <WtfGithubLoginButton size="small" redirect="/collections" /> -->
            </div>
          </div>
        </Popper>
      </div>
    </div>
  </div>
</template>

<!-- <script setup>

</script> -->

<script>
export default {
  name: 'UserButtonTour',
  data() {
    return {
      showTooltip: false
    }
  },
  mounted() {
    this.blockBodyScroll()
    setTimeout(() => {
      this.showTooltip = true
    }, 200)
  },
  methods: {
    blockBodyScroll() {
      const scrollBarGap =
        window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollBarGap}px`
      document.querySelector(
        '#main-header'
      ).style.paddingRight = `${scrollBarGap}px`
      document.querySelector(
        '#tour-main-header'
      ).style.paddingRight = `${scrollBarGap}px`
    },
    unblockBodyScroll() {
      setTimeout(() => {
        document.body.style.overflow = null
        document.body.style.paddingRight = null
        document.querySelector('#main-header').style.paddingRight = null
        // document.querySelector('#tour-main-header').style.paddingRight = null
      }, 16)
    },
    closeTour() {
      this.unblockBodyScroll()
      setTimeout(() => {
        this.$emit('close')
      }, 16)
    },
    featureSeenHandler() {
      window.localStorage.setItem('collections-feature-seen', true)
      this.closeTour()
    }
  }
}
</script>
