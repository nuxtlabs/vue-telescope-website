<template>
  <header
    id="main-header"
    class="the-header h-16 fixed top-0 left-0 w-full z-50 overflow-hidden"
  >
    <div
      class="w-full h-full flex justify-between items-center max-w-container-max-width m-auto px-4"
    >
      <NuxtLink ref="logo" to="/" class="opacity-0">
        <TheLogo class="h-8" />
      </NuxtLink>
      <div class="flex items-center">
        <NuxtLink
          ref="explore-link"
          to="/explore"
          class="opacity-0 sm:mr-4 font-display-weight"
        >
          <span class="hover-hover:hover:opacity-50">Explore</span>
        </NuxtLink>

        <div
          ref="install-extension-button"
          class="opacity-0 hidden sm:inline-flex"
        >
          <InstallExtensionButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TheLogo from '@/assets/logo/logo.svg?inline'

export default {
  components: {
    TheLogo
  },
  mounted() {
    const logo = this.$refs.logo.$el
    const exploreLink = this.$refs['explore-link'].$el
    const installExtensionButton = this.$refs['install-extension-button']

    this.$gsap.fromTo(
      logo,
      {
        opacity: 0,
        scale: 0.75,
        y: '-15px'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        ease: 'power4.inOut'
      }
    )
    this.$gsap.fromTo(
      installExtensionButton,
      {
        opacity: 0,
        scale: 0.75,
        y: '-15px'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        // delay: 1,
        ease: 'power4.inOut'
      }
    )
    this.$gsap.fromTo(
      exploreLink,
      {
        opacity: 0,
        scale: 0.75,
        y: '-15px'
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.45,
        // delay: 1.25,
        ease: 'power4.inOut'
      }
    )
  }
}
</script>

<style scoped>
.the-header {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
