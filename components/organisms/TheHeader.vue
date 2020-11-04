<template>
  <header
    id="main-header"
    class="the-header h-16 fixed top-0 left-0 w-full z-50 overflow-hidden"
  >
    <div
      class="w-full h-full flex justify-between items-center max-w-container-max-width m-auto px-4"
    >
      <NuxtLink ref="logo" to="/" class="opacity-0" aria-label="Home Page">
        <TheLogo class="h-8" />
      </NuxtLink>
      <div class="flex items-center">
        <ChangelogLink ref="changelog" class="mr-2 sm:mr-4 opacity-0">
          <span v-if="!$changelog.hasSeen" class="hover-hover:hover:opacity-50">
            What's New
          </span>
        </ChangelogLink>
        <NuxtLink
          ref="explore-link"
          to="/explore"
          class="opacity-0 sm:mr-4 font-display-weight"
        >
          <span class="hover-hover:hover:opacity-50">Explore</span>
        </NuxtLink>

        <ClientOnly>
          <div ref="user-container" class="opacity-0 sm:mr-4">
            <button
              v-if="!$strapi.user"
              class="font-display-weight focus:outline-none"
              @click="login"
            >
              <span class="hover-hover:hover:opacity-50"
                >LogIn with GitHub</span
              >
            </button>
            <NuxtLink v-else to="/lists" class="font-display-weight">
              <span class="hover-hover:hover:opacity-50">My Lists</span>
            </NuxtLink>
          </div>
        </ClientOnly>

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
    const changelog = this.$refs.changelog.$el
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
      [changelog, exploreLink],
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
    this.$nextTick(() => {
      const userContainer = this.$refs['user-container']
      this.$gsap.fromTo(
        userContainer,
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
    })
  },
  methods: {
    login() {
      this.$strapi.$cookies.set('redirect', this.$route.fullPath)
      window.location = `${this.$config.strapiURL}/connect/github`
    }
  }
}
</script>

<style scoped>
.the-header {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
