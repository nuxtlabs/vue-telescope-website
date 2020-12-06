<template>
  <div class="py-12 bg-primary-50">
    <div
      class="max-w-container m-auto px-4 flex flex-col items-center justify-center"
    >
      <h1
        class="text-five leading-five font-display-weight text-primary-900 mb-4 text-center"
      >
        Join other Vue.js devs
      </h1>
      <InstallExtensionButton size="large" class="mb-4" />
      <div>
        <p class="text-center mb-1 text-base leading-base">Available on:</p>
        <div class="flex">
          <AppButton
            tag="a"
            href="https://chrome.google.com/webstore/detail/vue-telemetry/neaebjphlfplgdhedjdhcnpjkndddbpd"
            appearance="transparent"
            size="small"
            class="mr-1"
          >
            <ChromeColorIcon class="h-6 mr-2" />
            <span>Chrome</span>
          </AppButton>
          <AppButton
            tag="a"
            href="https://addons.mozilla.org/en-GB/firefox/addon/vue-telemetry"
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
