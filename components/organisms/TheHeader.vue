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
          class="opacity-0 mr-2 sm:mr-4 font-display-weight"
        >
          <span class="hover-hover:hover:opacity-50">Explore</span>
        </NuxtLink>
        <NuxtLink
          ref="lists-link"
          to="/collections"
          class="opacity-0 font-display-weight"
        >
          <span class="hover-hover:hover:opacity-50">Collections</span>
        </NuxtLink>

        <ClientOnly>
          <button
            v-if="$strapi.user"
            ref="logout-link"
            class="ml-2 sm:ml-4 font-display-weight focus:outline-none"
            @click="logout"
          >
            <span class="hover-hover:hover:opacity-50">Logout</span>
          </button>
        </ClientOnly>

        <div
          ref="install-extension-button"
          class="ml-4 opacity-0 hidden sm:inline-flex"
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
    const listsLink = this.$refs['lists-link'].$el
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
      [changelog, exploreLink, listsLink],
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
      const logoutLink = this.$refs['logout-link']
      this.$gsap.fromTo(
        logoutLink,
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
    async logout() {
      try {
        await this.$strapi.logout()
      } catch (e) {}
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
