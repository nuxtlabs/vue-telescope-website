<template>
  <header
    id="main-header"
    ref="main-header"
    class="the-header h-16 fixed top-0 left-0 w-full z-50 overflow-hidden min-w-body"
  >
    <div
      class="w-full h-full flex justify-between items-center max-w-container m-auto px-4"
    >
      <NuxtLink ref="logo" to="/" class="opacity-0" aria-label="Home Page">
        <TheLogo class="h-8 hidden sm:block" />
        <TheLogoMobile class="h-8 sm:hidden" />
      </NuxtLink>
      <div class="flex items-center">
        <ChangelogLink
          ref="changelog"
          class="mr-2 sm:mr-4 opacity-0 hidden sm:inline-flex"
        >
          <span
            v-if="!$changelog.hasSeen"
            class="has-hover:hover:opacity-50 transition-opacity duration-200"
          >
            What's New
          </span>
        </ChangelogLink>
        <NuxtLink
          ref="explore-link"
          to="/explore"
          class="opacity-0 mr-2 sm:mr-4 font-display-weight"
        >
          <span
            class="has-hover:hover:opacity-50 transition-opacity duration-200"
            >Explore</span
          >
        </NuxtLink>
        <!-- <NuxtLink
          ref="collections-link"
          to="/collections"
          class="opacity-0 font-display-weight"
        >
          <SaveIcon />
        </NuxtLink> -->

        <ClientOnly>
          <UserButton
            ref="user-button"
            @click.native="showMenu = !showMenu"
            v-click-outside="() => (showMenu = false)"
          />
        </ClientOnly>

        <ClientOnly>
          <Portal to="default-layout">
            <Popper
              :offset-x="4"
              :offset-y="-2"
              placement="bottom-end"
              v-if="showMenu"
              :anchor="$refs['user-button'].$el"
              v-slot:default="{ popperInstance }"
            >
              <UserButtonMenu />
            </Popper>
          </Portal>
        </ClientOnly>

        <!-- <div
          ref="install-extension-button"
          :class="[
            isMobile || isExtensionInstalled
              ? 'hidden'
              : 'hidden sm:inline-flex'
          ]"
          class="ml-4 opacity-0"
        >
          <InstallExtensionButton />
        </div> -->
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import TheLogo from '@/assets/logo/logo.svg?inline'
import TheLogoMobile from '@/assets/logo/square-logo.svg?inline'
// import BookmarksIcon from '@/assets/icons/bookmarks.svg?inline'
// import SaveIcon from '@/assets/icons/save.svg?inline'

export default {
  components: {
    TheLogo,
    TheLogoMobile
    // BookmarksIcon,
    // SaveIcon
  },
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    user() {
      return this.$strapi.user
    },
    ...mapState({
      isMobile: (state) => state.isMobile,
      isExtensionInstalled: (state) => state.isExtensionInstalled
    })
  },
  mounted() {
    const logo = this.$refs.logo.$el
    const changelog = this.$refs.changelog.$el
    const exploreLink = this.$refs['explore-link'].$el
    // const collectionsLink = this.$refs['collections-link'].$el
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
  }
}
</script>

<style scoped>
.the-header {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
