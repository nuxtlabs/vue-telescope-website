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

        <UserButton ref="user-button" @click.native="showMenu = true" />

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

function pixelLimiter(input, min, max) {
  if (input < min) {
    return min
  } else if (input > max) {
    return max
  } else {
    return input
  }
}

export default {
  components: {
    TheLogo,
    TheLogoMobile
    // BookmarksIcon,
    // SaveIcon
  },
  data() {
    return {
      showMenu: false,
      rect: null,
      lastKnownPos: 0,
      lastDown: null,
      lastDownTicker: null,
      lastUp: null,
      lastUpTicker: null,
      translateY: 0
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
  },
  created() {
    if (process.browser) {
      this.$nextTick(() => {
        this.rect = this.$refs['main-header'].getBoundingClientRect()
      })
      window.addEventListener('scroll', this.handler)
      window.addEventListener('resize', () => {
        this.rect = this.$refs['main-header'].getBoundingClientRect()
      })
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handler)
  },
  methods: {
    tick(ms) {
      const scrollPos =
        window.pageYOffset ||
        (document.documentElement || document.body.parentNode || document.body)
          .scrollTop
      // console.log(scrollPos);
      const el = this.$refs['main-header']
      // const elH = el.getBoundingClientRect().height;
      // if (scrollPos > elH) {
      //   this.originalHeaderIsVisible = false;
      //   el.classList.add('is-simple-fixed');
      // } else {
      //   this.originalHeaderIsVisible = true;
      //   el.classList.remove('is-simple-fixed');
      // }
      const onTop = scrollPos <= 0
      const scrollUp = scrollPos < this.lastKnownPos
      const scrollDown = scrollPos > this.lastKnownPos && scrollPos
      let ticker = 0
      if (onTop) {
        this.translateY = 0
        el.style.transform = `translate3d(0,${this.translateY}px,0)`
      }
      if (scrollUp) {
        ticker = Math.abs(this.lastDown - scrollPos)
        this.translateY = pixelLimiter(
          this.translateY + Math.abs(this.lastUpTicker - ticker),
          -this.rect.height,
          0
        )
        el.style.transform = `translate3d(0,${this.translateY}px,0)`
        this.lastDownTicker = 0
        this.lastUpTicker = ticker
        this.lastUp = scrollPos
      }
      if (scrollDown) {
        ticker = Math.abs(this.lastUp - scrollPos)
        this.translateY = pixelLimiter(
          this.translateY - Math.abs(this.lastDownTicker - ticker),
          -this.rect.height,
          0
        )
        el.style.transform = `translate3d(0,${this.translateY}px,0)`
        this.lastUpTicker = 0
        this.lastDownTicker = ticker
        this.lastDown = scrollPos
      }
      this.lastKnownPos = scrollPos
      if (!this.isMobile) {
        document.documentElement.style.setProperty(
          '--header-offset',
          this.translateY + 'px'
        )
      }
    },
    handler() {
      return window.requestAnimationFrame(this.tick)
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
