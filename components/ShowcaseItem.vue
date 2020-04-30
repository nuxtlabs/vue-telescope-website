<template>
  <div class="flex flex-col sm:flex-row">
    <div class="w-full sm:flex-1 relative">
      <showcaseBrowser :img="data.screenshot_url" :url="data.url" />
    </div>
    <div class="w-full sm:flex-1">
      <div class="px-4">
        <h1
          class="text-4xl font-black tracking-tighter text-nuxt-gray leading-9 mb-4 mt-4 sm:mt-0"
        >
          {{ data.domain }}
        </h1>
        <div
          class="relative text-sm italic leading-6 font-thin md:flex-grow ml-4"
        >
          <svg
            class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-green-100"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path
              d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
            />
          </svg>
          <p class="relative">
            {{ data.meta.description }}
          </p>
        </div>
        <div class="">
          <div>
            <p class="text-nuxt-lightgreen font-semibold">Vue version</p>
            <p class="text-sm text-gray-900">{{ data.vue_version }}</p>
          </div>
          <div>
            <p class="text-nuxt-lightgreen font-semibold">Mode</p>
            <p class="text-sm text-gray-900">
              {{ data.has_ssr ? 'SSR' : 'SPA' }}
            </p>
          </div>
          <div>
            <p class="text-nuxt-lightgreen font-semibold">Target</p>
            <p class="text-sm text-gray-900">
              {{ data.is_static ? 'Static' : 'Dynamic' }}
            </p>
          </div>
          <div>
            <p class="text-nuxt-lightgreen font-semibold">Framework</p>
            <p class="text-sm text-gray-900">
              {{ data.framework ? data.framework.name : 'none detected' }}
            </p>
          </div>
          <div>
            <p class="text-nuxt-lightgreen font-semibold">UI</p>
            <p class="text-sm text-gray-900">
              {{ data.ui ? data.ui.name : 'none detected' }}
            </p>
          </div>
          <div>
            <p class="text-nuxt-lightgreen font-semibold">Modules</p>
            <ul>
              <li
                v-for="(m, i) in data.showcase_modules"
                :key="i"
                class="text-sm text-gray-900"
              >
                {{ m.module.name }}
              </li>
            </ul>
          </div>
          <div>
            <p class="text-nuxt-lightgreen font-semibold">Plugins</p>
            <ul>
              <li
                v-for="(p, i) in data.showcases_plugins"
                :key="i"
                class="text-sm text-gray-900"
              >
                {{ p.plugin.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import showcaseBrowser from '@/components/ShowcaseBrowser'
export default {
  components: {
    showcaseBrowser
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
