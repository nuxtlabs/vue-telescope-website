<template>
  <div class="fixed top-0 left-0 z-50 w-full h-full">
    <div
      class="absolute top-0 left-0 w-full h-full"
      style="background-color: rgba(0, 0, 0, 0.5)"
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
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="#F0F0F0" />
            <rect x="2" y="7" width="4" height="4" fill="#C4C4C4" />
            <rect x="4" y="3" width="4" height="4" fill="#C4C4C4" />
            <rect x="8" y="1" width="4" height="4" fill="#C4C4C4" />
            <rect x="18" y="7" width="4" height="4" fill="#C4C4C4" />
            <rect x="12" y="1" width="4" height="4" fill="#C4C4C4" />
            <rect x="16" y="3" width="4" height="4" fill="#C4C4C4" />
            <rect x="15" y="11" width="4" height="4" fill="#C4C4C4" />
            <rect x="11" y="13" width="4" height="4" fill="#C4C4C4" />
            <rect x="10" y="19" width="4" height="4" fill="#C4C4C4" />
          </svg>
        </button>
        <Popper
          v-if="showTooltip"
          placement="bottom-end"
          :anchor="$refs.anchor"
          v-slot:default="{ popperInstance }"
        >
          <div class="p-4" @click="closeTour">
            <div class="mb-4 font-bold-body-weight">
              Now you can safe websites to own Collections!
            </div>
            <div class="flex items-center justify-end">
              <button
                class="mr-4 text-sm leading-sm"
                @click="featureSeenHandler"
              >
                Not interested
              </button>
              <GithubLoginButton size="small" redirect="/collections" />
            </div>
          </div>
        </Popper>
      </div>
    </div>
  </div>
</template>

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
        document.querySelector('#tour-main-header').style.paddingRight = null
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

<style></style>
