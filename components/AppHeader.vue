<template>
  <header
    id="main-header"
    ref="main-header"
    class="app-header h-16 fixed top-0 left-0 w-full z-50 overflow-hidden min-w-body"
  >
    <div
      class="w-full h-full flex justify-between items-center max-w-container m-auto px-4"
    >
      <NuxtLink ref="logo" to="/" aria-label="Home Page">
        <TheLogo class="h-8 hidden sm:block" />
        <TheLogoMobile class="h-10 sm:hidden" />
      </NuxtLink>
      <div class="flex items-center">
        <!-- TODO -->
        <!-- <ChangelogLink
          ref="changelog"
          class="mr-2 sm:mr-4 hidden sm:inline-flex"
        >
          <span
            v-if="!$changelog.hasSeen"
            class="has-hover:hover:opacity-50 transition-opacity duration-200"
          >
            What's New
          </span>
        </ChangelogLink> -->

        <NuxtLink
          ref="explore-link"
          to="/explore"
          class="mr-4 sm:mr-6 font-display-weight"
        >
          <span
            class="has-hover:hover:opacity-50 transition-opacity duration-200"
            >Explore</span
          >
        </NuxtLink>

        <!-- TODO -->
        <!-- <ClientOnly> -->
        <!-- <UserButton ref="user-button" @click.native="showMenu = true" /> -->
        <!-- </ClientOnly> -->

        <!-- TODO -->
        <!-- <ClientOnly>
          <Portal to="default-layout">
            <Popper
              v-if="showMenu"
              :offset-x="12"
              :offset-y="-2"
              placement="bottom-end"
              :anchor="$refs['user-button'].$el"
            >
              <UserButtonMenu @close-menu="showMenu = false" />
            </Popper>
          </Portal>
        </ClientOnly> -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import TheLogo from '@/assets/logo/logo.svg'
import TheLogoMobile from '@/assets/logo/square-logo.svg'

const showMenu = ref(false)
</script>

<style scoped>
.app-header {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.75);
}
</style>
