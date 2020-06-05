<template>
  <div
    class="flex-1 flex flex-col md:flex-row md:items-center justify-between w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8"
  >
    <div class="mt-12 md:mt-0">
      <div class="text-nuxt-gray text-center md:text-left">
        <h1 class="text-4xl font-extrabold leading-none">Browser extension</h1>
        <p class="text-nuxt-lightgreen font-semibold text-xl">
          Get the free browser extension
        </p>
        <p class="mt-2">
          Install the Vue Telemetry browser extension to see
          <br />the technologies used on websites you visit at a glance.
        </p>
        <div
          class="mt-4 mb-8 md:mb-0 flex flex-row justify-center md:justify-start"
        >
          <button
            type="button"
            class="flex items-center justify-center w-48 px-4 py-2 mr-2 border border-transparent text-base leading-10 font-semibold rounded-full text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:bg-nuxt-lightgreen active:bg-nuxt-lightgreen transition ease-in-out duration-150"
          >
            <ChromeIcon class="h-5 w-5" />
            Google chrome
          </button>
          <button
            type="button"
            class="flex items-center justify-center w-48 px-4 py-2 border border-transparent text-base leading-10 font-semibold rounded-full text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:bg-nuxt-lightgreen active:bg-nuxt-lightgreen transition ease-in-out duration-150"
          >
            <FirefoxIcon class="h-5 w-5" />
            Mozilla Firefox
          </button>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <img class="ml-4" src="/img/extension.svg" />
    </div>
  </div>
</template>

<script>
import ChromeIcon from '@/assets/icons/chrome.svg?inline'
import FirefoxIcon from '@/assets/icons/firefox.svg?inline'

export default {
  components: {
    ChromeIcon,
    FirefoxIcon
  }
}
</script>
