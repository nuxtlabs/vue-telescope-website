<template>
  <div class="min-h-(screen-header)">
    <div class="px-4 max-w-container m-auto pt-12">
      <h1 class="text-four leading-four font-display-weight text-center mb-12">
        Check out Vue Telescope browser integrations
      </h1>
      <div class="flex flex-wrap max-w-[24rem] m-auto">
        <div
          class="w-full sm:w-1/2 flex flex-col items-center justify-center mb-8"
        >
          <ChromeColorIcon class="h-32 mb-8" />
          <AppButton
            tag="a"
            :href="config.googleStoreUrl"
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
            :href="config.firefoxStoreUrl"
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

<script setup lang="ts">
import ChromeColorIcon from '@/assets/icons/chrome-color.svg'
import FirefoxColorIcon from '@/assets/icons/firefox-color.svg'

useFrontMatter({ title: 'Browser Extensions' })

const config = useRuntimeConfig().public

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
