<template>
  <div class="h-full flex flex-col">
    <div class="mb-4">
      <img
        :src="data.screenshot_url"
        class="h-60 w-full object-cover object-top rounded border-2 border-gray-100"
      />
      <div class="flex items-center justify-between mt-2">
        <a
          :href="data.url"
          target="_blank"
          rel="noopener nofollow"
          class="text-lg font-extrabold text-nuxt-gray"
        >
          {{ hostname }}
        </a>
        <ExternalLinkIcon @click="openUrl" />
      </div>
    </div>
    <div class="flex-1 flex flex-col mb-4">
      <div class="h-full rounded overflow-y-scroll bg-gray-50">
        <div class="p-4 text-sm h-72">
          <div class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">Mode</p>
            <div class="">{{ data.has_ssr ? 'SSR' : 'SPA' }}</div>
          </div>
          <div class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">Target</p>
            <div class="capitalize">
              {{ data.is_static ? 'static' : 'dynamic' }}
            </div>
          </div>
          <div v-if="data.vue_version" class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">Vue version</p>
            <div class="capitalize">{{ data.vue_version }}</div>
          </div>
          <div v-if="data.framework" class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">Framework</p>
            <div class="flex flex-row items-center">
              <img
                v-if="data.framework.img_path"
                :src="iconUrl(data.framework.img_path)"
                :alt="data.framework.name"
                class="w-4 h-4"
              />
              <a
                :href="data.framework.url"
                class="ml-2 capitalize hover:text-nuxt-lightgreen transition ease-linear duration-150"
                >{{ data.framework.name }}</a
              >
            </div>
          </div>
          <div v-if="data.ui" class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">UI</p>
            <div class="flex flex-row items-center">
              <img
                v-if="data.ui.img_path"
                :src="iconUrl(data.ui.img_path)"
                :alt="data.ui.name"
                class="w-4 h-4"
              />
              <a
                :href="data.ui.url"
                class="ml-2 capitalize hover:text-nuxt-lightgreen transition ease-linear duration-150"
                >{{ data.ui.name }}</a
              >
            </div>
          </div>
          <div v-if="data.showcases_plugins.length" class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">Plugins</p>
            <div class="flex flex-row items-center flex-wrap">
              <a
                v-for="(sp, i) in data.showcases_plugins"
                :key="i"
                :href="sp.plugin.url"
                target="_blank"
                rel="noopener"
                class="px-2 py-1 text-nuxt-gray bg-cool-gray-200 rounded mr-2 last:mr-0 mb-2 hover:bg-cool-gray-300 transition ease-linear duration-150"
              >
                {{ sp.plugin.name }}
              </a>
            </div>
          </div>
          <div v-if="data.showcase_modules.length" class="mb-4">
            <p class="text-nuxt-lightgreen font-semibold mb-3">Modules</p>
            <div class="flex flex-row items-center flex-wrap">
              <a
                v-for="(sm, i) in data.showcase_modules"
                :key="i"
                :href="sm.module.url"
                target="_blank"
                rel="noopener"
                class="px-2 py-1 text-nuxt-gray bg-cool-gray-200 rounded mr-2 last:mr-0 mb-2 hover:bg-cool-gray-300 transition ease-linear duration-150"
              >
                {{ sm.module.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hidden sm:flex items-center justify-around">
      <RobotIllustration />

      <div class="flex flex-col items-center justify-around">
        <div class="text-sm text-nuxt-gray font-semibold mb-2">
          Get same results with the free browser extension
        </div>
        <div class="flex justify-around">
          <button
            type="button"
            class="flex items-center justify-center px-4 py-2 mr-2 border border-transparent text-sm leading-4 font-semibold rounded-full text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:bg-nuxt-lightgreen active:bg-nuxt-lightgreen transition ease-linear duration-150"
          >
            <ChromeIcon class="h-4 w-4" />
            Google Chrome
          </button>
          <button
            type="button"
            class="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-4 font-semibold rounded-full text-white bg-nuxt-lightgreen hover:shadow-xl focus:outline-none focus:bg-nuxt-lightgreen active:bg-nuxt-lightgreen transition ease-linear duration-150"
          >
            <FirefoxIcon class="h-4 w-4" />
            Mozilla Firefox
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLinkIcon from '@/assets/icons/external-link.svg?inline'
import RobotIllustration from '@/assets/illustrations/robot.svg?inline'
import ChromeIcon from '@/assets/icons/chrome.svg?inline'
import FirefoxIcon from '@/assets/icons/firefox.svg?inline'

export default {
  name: 'Data',
  components: {
    ExternalLinkIcon,
    RobotIllustration,
    ChromeIcon,
    FirefoxIcon
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    hostname() {
      return this.data.hostname.replace('www.', '')
    }
  },
  methods: {
    openUrl() {
      window.open(this.data.url, '_blank')
    },
    iconUrl(path) {
      return `${process.env.ICONS_URL}${path}`
    }
  }
}
</script>

<style></style>
