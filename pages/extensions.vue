<template>
  <div class="min-h-(screen-header)">
    <div class="px-4 max-w-container m-auto pt-12">
      <h1 class="text-four leading-four font-display-weight text-center mb-12">
        Check out Vue Telescope browser integrations
      </h1>
      <div class="flex flex-wrap max-w-[36rem] m-auto">
        <div
          class="w-full sm:w-1/3 flex flex-col items-center justify-center mb-12"
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
          class="w-full sm:w-1/3 flex flex-col items-center justify-center mb-12"
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
        <div
          class="w-full sm:w-1/3 flex flex-col items-center justify-center mb-12"
        >
          <EdgeColorIcon class="h-32 mb-8" />
          <AppButton
            tag="a"
            :href="config.edgeStoreUrl"
            size="base"
            appearance="primary"
          >
            Add to Edge
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChromeColorIcon from '@/assets/icons/chrome-color.svg'
import FirefoxColorIcon from '@/assets/icons/firefox-color.svg'
import EdgeColorIcon from '@/assets/icons/edge-color.svg'

useFrontMatter({ title: 'Browser Extensions' })

const config = useRuntimeConfig().public

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
