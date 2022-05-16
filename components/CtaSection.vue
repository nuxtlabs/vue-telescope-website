<template>
  <div class="py-12 bg-primary-50">
    <div
      class="max-w-container m-auto px-4 flex flex-col items-center justify-center"
    >
      <h1
        class="text-five leading-five font-display-weight text-grey-900 mb-4 text-center"
      >
        Join 2000+ Vue.js developers!
      </h1>
      <InstallExtensionButton size="large" class="mb-4" />
      <div>
        <p class="text-center mb-1 text-base leading-base">Available on:</p>
        <div class="flex">
          <AppButton
            tag="a"
            :href="$config.googleStoreUrl"
            appearance="transparent"
            size="small"
            class="mr-1"
          >
            <ChromeColorIcon class="h-6 mr-2" />
            <span>Chrome</span>
          </AppButton>
          <AppButton
            tag="a"
            :href="$config.firefoxStoreUrl"
            appearance="transparent"
            size="small"
            class="ml-1"
          >
            <FirefoxColorIcon class="h-6 mr-2" />
            <span>Firefox</span>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChromeColorIcon from '@/assets/icons/chrome-color.svg'
import FirefoxColorIcon from '@/assets/icons/firefox-color.svg'
</script>
