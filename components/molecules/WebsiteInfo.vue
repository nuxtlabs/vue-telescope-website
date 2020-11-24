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
          image="https://icons.vuetelemetry.com/vue.svg"
          :text="website.vueVersion"
        />

        <ExploreDataItem
          v-if="website.framework"
          label="Framework"
          tag="a"
          :href="website.framework.url"
          target="_blank"
          rel="noreferrer noopener"
          :image="`https://icons.vuetelemetry.com${website.framework.imgPath}`"
          :text="website.framework.name"
        />

        <ExploreDataItem
          v-if="website.ui"
          label="UI Framework"
          tag="a"
          :href="website.ui.url"
          target="_blank"
          rel="noreferrer noopener"
          :image="`https://icons.vuetelemetry.com${website.ui.imgPath}`"
          :text="website.ui.name"
        />

        <ExploreDataItem
          label="Rendering"
          :text="website.hasSSR ? 'Universal' : 'Client-side'"
        />

        <ExploreDataItem
          v-if="website.framework && website.framework.slug === 'nuxtjs'"
          label="Deployment"
          :text="website.isStatic ? 'Static' : 'Server'"
        />
      </div>
    </div>

    <div v-if="website.plugins.length" class="mb-10">
      <div class="label mb-4 xl:px-8">
        <AppWebsiteDataLabel>
          <PluginsIcon class="h-6 mr-2 opacity-50" />Plugins
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap xl:px-8">
        <ExploreDataItem
          v-for="{ name, id, url } in website.plugins"
          :key="id"
          :href="url"
          tag="a"
          target="_blank"
          rel="noreferrer noopener"
          :text="name"
        />
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
        <ExploreDataItem
          v-for="{ name, id, url } in website.modules"
          :key="id"
          :href="url"
          tag="a"
          target="_blank"
          rel="noreferrer noopener"
          :text="name"
        />
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
