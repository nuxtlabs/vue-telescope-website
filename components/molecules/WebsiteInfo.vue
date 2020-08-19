<template>
  <div>
    <div class="mb-10">
      <div class="label mb-4 xl:px-8">
        <AppWebsiteDataLabel>
          <InfoIcon class="h-5 mr-2 opacity-50" />Info
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap xl:px-8">
        <ExploreDataItem
          label="Vue Version"
          tag="a"
          href="https://vuejs.org"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="w-6 h-6 mr-2"
            :src="`https://icons.vuetelemetry.com/vue.svg`"
            alt
          />
          <div class="text-eight font-bold-body-weight">
            {{ website.vueVersion }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem
          v-if="website.framework"
          label="Framework"
          tag="a"
          :href="website.framework.url"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="w-6 h-6 mr-2"
            :src="`https://icons.vuetelemetry.com${website.framework.imgPath}`"
            alt
          />
          <div class="text-seven leading-seven font-bold-body-weight">
            {{ website.framework.name }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem
          v-if="website.ui"
          label="UI Framework"
          tag="a"
          :href="website.ui.url"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="w-6 h-6 mr-2"
            :src="`https://icons.vuetelemetry.com${website.ui.imgPath}`"
            alt
          />
          <div class="text-seven leading-seven font-bold-body-weight">
            {{ website.ui.name }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem label="Rendering">
          <div
            class="flex items-center text-seven leading-seven font-bold-body-weight"
          >
            {{ website.hasSSR ? 'Universal' : 'Client-side' }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem
          v-if="website.framework && website.framework.slug === 'nuxtjs'"
          label="Deployment"
        >
          <div
            class="flex items-center text-seven leading-seven font-bold-body-weight"
          >
            {{ website.isStatic ? 'Static' : 'Server' }}
          </div>
        </ExploreDataItem>
      </div>
    </div>

    <div v-if="website.plugins.length" class="mb-10">
      <div class="label mb-4 xl:px-8">
        <AppWebsiteDataLabel>
          <PluginsIcon class="h-6 mr-2 opacity-50" />Plugins
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap xl:px-8">
        <a
          v-for="plugin in website.plugins"
          :key="plugin.id"
          :href="plugin.url"
          target="_blank"
          class="mr-4 mb-4 bg-grey-50 hover:bg-grey-100 border border-grey-200 rounded-xl"
        >
          <span class="block font-bold-body-weight px-4 py-2">
            {{ plugin.name }}
          </span>
        </a>
      </div>
    </div>

    <div v-if="website.modules.length" class="mb-10">
      <div class="label mb-4 xl:px-8">
        <AppWebsiteDataLabel>
          <ModulesIcon class="h-6 mr-2 opacity-50" />
          <span>Nuxt Modules</span>
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap xl:px-8">
        <a
          v-for="module in website.modules"
          :key="module.id"
          :href="module.url"
          target="_blank"
          class="mr-4 mb-4 bg-grey-50 hover:bg-grey-100 border border-grey-200 rounded-xl"
        >
          <span class="block font-bold-body-weight px-4 py-2">
            {{ module.name }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ModulesIcon from '@/assets/icons/modules.svg?inline'
import PluginsIcon from '@/assets/icons/plugins.svg?inline'
import InfoIcon from '@/assets/icons/info.svg?inline'

export default {
  components: {
    ModulesIcon,
    PluginsIcon,
    InfoIcon
  },
  props: {
    website: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>
.twitter-like .data-wrapper {
  @apply px-8;
}
.twitter-like .label {
  @apply px-8;
}
</style>
