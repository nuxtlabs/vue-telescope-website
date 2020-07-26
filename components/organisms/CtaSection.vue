<template>
  <div class="py-12 bg-primary-50">
    <div
      class="max-w-container-max-width m-auto px-4 flex flex-col items-center justify-center"
    >
      <h1 class="text-five leading-five font-display-weight mb-4 text-center">
        Join other Vue.js devs
      </h1>
      <InstallExtensionButton size="large" class="mb-4" />
      <div>
        <p class="text-center mb-1 text-base leading-base">Available on:</p>
        <div class="flex">
          <AppButton
            appearance="transparent"
            outlined
            size="small"
            class="mr-1"
          >
            <ChromeColorIcon class="h-6 mr-2" />
            <span>Chrome</span>
          </AppButton>
          <AppButton
            appearance="transparent"
            outlined
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

<script>
import ChromeColorIcon from '@/assets/icons/chrome-color.svg?inline'
import FirefoxColorIcon from '@/assets/icons/firefox-color.svg?inline'

export default {
  components: {
    ChromeColorIcon,
    FirefoxColorIcon
  }
}
</script>

<style></style>
