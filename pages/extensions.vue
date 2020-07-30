<template>
  <div class="page-wrapper">
    <div class="px-4 max-w-container-max-width m-auto pt-12">
      <h1 class="text-four leading-four font-display-weight text-center mb-12">
        Check out Vue Telemetry browser integrations
      </h1>
      <div class="flex flex-wrap max-w-readable-line-length m-auto">
        <div
          class="w-full sm:w-1/2 flex flex-col items-center justify-center mb-8"
        >
          <ChromeColorIcon class="h-32 mb-8" />
          <AppButton
            tag="a"
            href="https://chrome.google.com/webstore/detail/vue-telemetry/neaebjphlfplgdhedjdhcnpjkndddbpd"
            size="base"
            appearance="primary"
          >
            Add to Chrome
          </AppButton>
        </div>
        <div
          class="w-full sm:w-1/2 flex flex-col items-center justify-center mb-8"
        >
          <FirefoxColorIcon class="h-32 mb-8" />
          <AppButton
            tag="a"
            href="https://addons.mozilla.org/en-GB/firefox/addon/vue-telemetry"
            size="base"
            appearance="primary"
          >
            Add to Firefox
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

<style scoped>
.page-wrapper {
  min-height: calc(100vh - (10.25rem + 4rem));
}
</style>
