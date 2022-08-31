<template>
  <div class="xl:px-8">
    <div class="mb-10 mt-8">
      <div class="label mb-4">
        <ShowcaseInfoLabel>
          <InfoIcon class="h-5 mr-2 opacity-50" />Info
        </ShowcaseInfoLabel>
      </div>
      <div class="showcase-info-item-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
        <ShowcaseInfoItem
          label="Vue Version"
          tag="a"
          href="https://vuejs.org"
          target="_blank"
          rel="noreferrer noopener"
          :image="`${config.iconsURL}/vue.svg`"
          :text="showcase.vueVersion"
        />

        <ShowcaseInfoItem
          v-if="showcase.framework"
          label="Framework"
          tag="a"
          :href="showcase.framework.url"
          target="_blank"
          rel="noreferrer noopener"
          :image="`${config.iconsURL}${showcase.framework.imgPath}`"
          :text="showcase.framework.name"
        />

        <ShowcaseInfoItem
          v-if="showcase.ui"
          label="UI Framework"
          tag="a"
          :href="showcase.ui.url"
          target="_blank"
          rel="noreferrer noopener"
          :image="`${config.iconsURL}${showcase.ui.imgPath}`"
          :text="showcase.ui.name"
        />

        <ShowcaseInfoItem
          label="Rendering"
          :text="showcase.hasSSR ? 'Universal' : 'Client-side'"
        />

        <ShowcaseInfoItem
          v-if="showcase.framework && showcase.framework.slug === 'nuxtjs'"
          label="Deployment"
          :text="showcase.isStatic ? 'Static' : 'Server'"
        />
      </div>
    </div>

    <div v-if="showcase.plugins.length" class="mb-10">
      <div class="label mb-4 xl:px-8">
        <ShowcaseInfoLabel>
          <PluginsIcon class="h-6 mr-2 opacity-50" />Plugins
        </ShowcaseInfoLabel>
      </div>
      <div class="showcase-info-item-wrapper flex flex-wrap xl:px-8">
        <ShowcaseInfoItem
          v-for="{ name, id, url } in showcase.plugins"
          :key="id"
          :href="url"
          tag="a"
          target="_blank"
          rel="noreferrer noopener"
          :text="name"
        />
      </div>
    </div>

    <div v-if="showcase.modules.length" class="mb-10">
      <div class="label mb-4 xl:px-8">
        <ShowcaseInfoLabel>
          <ModulesIcon class="h-6 mr-2 opacity-50" />
          <span>Nuxt Modules</span>
        </ShowcaseInfoLabel>
      </div>

      <div class="showcase-info-item-wrapper flex flex-wrap xl:px-8">
        <ShowcaseInfoItem
          v-for="{ name, id, url } in showcase.modules"
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

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Showcase } from '~/types'

import ModulesIcon from '@/assets/icons/modules.svg'
import PluginsIcon from '@/assets/icons/plugins.svg'
import InfoIcon from '@/assets/icons/info.svg'

const config = useRuntimeConfig().public

defineProps({
  showcase: {
    type: Object as PropType<Showcase>,
    default: null
  }
})
</script>

<style scoped lang="postcss">
/* Styles for usage in Floating View Modal */
.floating-view .showcase-info-item-wrapper {
  @apply px-8;
}
.floating-view .label {
  @apply px-8;
}
</style>
