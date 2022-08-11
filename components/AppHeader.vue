<template>
  <header
    id="main-header"
    class="app-header h-header fixed body-lock-hack top-0 left-0 w-full z-50 overflow-hidden min-w-body"
  >
    <div
      class="w-full h-full flex justify-between items-center max-w-container m-auto px-4"
    >
      <NuxtLink to="/" aria-label="Home Page">
        <TheLogo class="h-8 hidden sm:block" />
        <TheLogoMobile class="h-10 sm:hidden" />
      </NuxtLink>
      <div class="flex items-center">
        <ClientOnly>
          <ChangelogLink
            class="mr-2 sm:mr-4 hidden sm:inline-flex"
          >
            <span
              v-if="!$changelog.hasSeen.value"
              class="has-hover:hover:opacity-50 transition-opacity duration-200"
            >
              What's New
            </span>
          </ChangelogLink>
        </ClientOnly>

        <NuxtLink
          to="/explore"
          class="mr-4 sm:mr-6 font-display-weight"
        >
          <span
            class="has-hover:hover:opacity-50 transition-opacity duration-200"
          >Explore</span>
        </NuxtLink>

        <UserButton ref="userButtonRef" @click.native="showMenu = true" />

        <ClientOnly>
          <teleport to="body">
            <Popper
              v-if="showMenu"
              :offset-x="12"
              :offset-y="-2"
              placement="bottom-end"
              :anchor="userButtonRef.$el"
            >
              <UserButtonPopup @close-menu="showMenu = false" />
            </Popper>
          </teleport>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import TheLogo from '@/assets/logo/logo.svg'
import TheLogoMobile from '@/assets/logo/square-logo.svg'

const userButtonRef = ref(null)

const showMenu = ref(false)

</script>

<style scoped>
.app-header {
  backdrop-filter: var(--scrim-filter);
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
