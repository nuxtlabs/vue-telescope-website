<template>
  <div class="flex flex-col sm:flex-row">
    <div class="w-full sm:flex-1 relative">
      <ShowcaseBrowser :img="data.screenshot_url" :url="data.url" />
    </div>
    <div class="w-full sm:flex-1">
      <div class="px-4">
        <h1
          class="text-4xl font-black tracking-tighter text-nuxt-gray leading-9 mb-4 mt-4 sm:mt-0"
        >
          {{ data.domain }}
        </h1>
        <div
          v-if="data.meta.description"
          class="relative text-sm italic leading-6 font-thin md:flex-grow ml-4 mb-8"
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
        <div class="flex flex-col">
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
                <p class="text-nuxt-lightgreen font-semibold mb-3">
                  Vue version
                </p>
                <div class="capitalize">{{ data.vue_version }}</div>
              </div>
              <div v-if="data.framework" class="mb-4">
                <p class="text-nuxt-lightgreen font-semibold mb-3">
                  Framework
                </p>
                <div class="capitalize">{{ data.framework.name }}</div>
              </div>
              <div v-if="data.ui" class="mb-4">
                <p class="text-nuxt-lightgreen font-semibold mb-3">UI</p>
                <div class="capitalize">{{ data.ui.name }}</div>
              </div>
              <div v-if="data.showcases_plugins.length" class="mb-4">
                <p class="text-nuxt-lightgreen font-semibold mb-3">Plugins</p>
                <div class="flex flex-row items-center flex-wrap">
                  <span
                    v-for="(sp, i) in data.showcases_plugins"
                    :key="i"
                    class="px-2 py-1 text-nuxt-gray bg-cool-gray-200 rounded mr-2 last:mr-0 mb-2"
                  >
                    {{ sp.plugin.name }}
                  </span>
                </div>
              </div>
              <div v-if="data.showcase_modules.length" class="mb-4">
                <p class="text-nuxt-lightgreen font-semibold mb-3">Modules</p>
                <div class="flex flex-row items-center flex-wrap">
                  <span
                    v-for="(sm, i) in data.showcase_modules"
                    :key="i"
                    class="px-2 py-1 text-nuxt-gray bg-cool-gray-200 rounded mr-2 last:mr-0 mb-2"
                  >
                    {{ sm.module.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
