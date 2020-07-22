<template>
  <header
    id="main-header"
    class="bg-white h-16 fixed top-0 left-0 w-full z-50 overflow-hidden"
  >
    <!-- <MagicHeader
      v-for="({ appearance, trigger }, i) in [
        { appearance: 'white', trigger: '#hero' },
        { appearance: 'emerald', trigger: '#welcome' },
        { appearance: 'black', trigger: '#featured' }
      ]"
      :key="appearance + i"
      :index="-Math.abs(i)"
      :appearance="appearance"
      :trigger="trigger"
    /> -->
    <div
      class="w-full h-full flex justify-between items-center max-w-container-max-width m-auto px-4"
    >
      <NuxtLink to="/" class="logo">
        <!-- <OneLogo class="h-8" /> -->
        <!-- <TwoLogo class="h-8" /> -->
        <!-- <ThreeLogo class="h-8" /> -->
        <FourLogo class="h-8" />
        <!-- <OldLogo class="h-8" /> -->
      </NuxtLink>
      <div class="flex items-center">
        <NuxtLink
          to="/explore"
          class="explore-link sm:mr-4 font-display-weight"
        >
          Explore
        </NuxtLink>

        <div class="install-extension-button hidden sm:inline-flex">
          <InstallExtensionButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import OneLogo from '@/assets/logo/one.svg?inline'
// import TwoLogo from '@/assets/logo/two.svg?inline'
// import ThreeLogo from '@/assets/logo/three.svg?inline'
import FourLogo from '@/assets/logo/four.svg?inline'
// import OldLogo from '@/assets/logo/old.svg?inline'

export default {
  components: {
    // OneLogo
    // TwoLogo
    // ThreeLogo
    FourLogo
    // OldLogo
  }
}
</script>

<style scoped>
.logo {
  opacity: 0;
  animation: scale 450ms theme('transitionTimingFunction.ease-out-material')
    forwards;
}
.install-extension-button {
  opacity: 0;
  animation: scale 150ms theme('transitionTimingFunction.ease-out-material')
    1000ms forwards;
}
.explore-link {
  opacity: 0;
  animation: scale 150ms theme('transitionTimingFunction.ease-out-material')
    1250ms forwards;
}
</style>
