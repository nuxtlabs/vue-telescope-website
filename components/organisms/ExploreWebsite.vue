<template>
  <div v-if="website" class="pointer-events-auto">
    <div class="header relative pt-14 pb-8 flex justify-between items-center">
      <!-- <div
        class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
        @click="$router.push('/explore')"
      >
        <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
      </div> -->
      <div class="relative">
        <h1
          class="truncate-multiline-2 pr-4 text-five leading-five md:text-five md:leading-five font-display-weight"
        >
          {{ website.siteName || website.title }}
        </h1>
        <a
          :href="website.url"
          target="_blank"
          class="h-6 absolute top-0 left-0 flex -mt-6 text-primary-300 font-bold-body-weight"
        >
          <LinkIcon class="w-3 mr-2" />
          <span class="" style="width: max-content;">
            {{ website.hostname }}
          </span>
        </a>
      </div>
      <!-- <AppButton
        appearance="dd"
        size="small"
        tag="a"
        :href="website.url"
        target="_blank"
        class="rounded-lg"
      >
        Visit
      </AppButton> -->
    </div>

    <AppResponsiveCloudinaryImage
      :src="website.screenshotUrl"
      ratio="4:3"
      sizes="100vw"
      class="image absolute top-0 left-0 w-full h-full mb-8 rounded-xl"
    />

    <div class="description mb-10">
      <p class="text-eight leading-eight">{{ website.description }}</p>
    </div>

    <div class="mb-10">
      <div class="label mb-4">
        <AppWebsiteDataLabel>
          <InfoIcon class="h-5 mr-2 opacity-50" />
          Info
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap">
        <ExploreDataItem label="Vue Version">
          <img
            class="w-8 h-8 mr-2"
            :src="`https://icons.vuetelemetry.com/vue.svg`"
            alt=""
          />
          <div class="text-eight font-bold-body-weight">
            {{ website.vueVersion }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem v-if="website.framework" label="Framework">
          <a
            :href="website.framework.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mr-2"
          >
            <img
              class="w-8 h-8"
              :src="`https://icons.vuetelemetry.com${website.framework.imgPath}`"
              alt=""
            />
          </a>
          <div class="text-seven leading-seven font-bold-body-weight">
            {{ website.framework.name }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem v-if="website.ui" label="UI Framework">
          <a
            :href="website.ui.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mr-2"
          >
            <img
              class="w-8 h-8"
              :src="`https://icons.vuetelemetry.com${website.ui.imgPath}`"
              alt=""
            />
          </a>
          <div class="text-seven leading-seven font-bold-body-weight">
            {{ website.ui.name }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem label="Rendering">
          <div
            class="h-8 flex items-center text-seven leading-seven font-bold-body-weight mr-2"
          >
            {{ website.hasSSR ? 'Server-side' : 'Client-side' }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem label="Deployment">
          <div
            class="h-8 flex items-center text-seven leading-seven font-bold-body-weight mr-2"
          >
            {{ website.isStatic ? 'Static' : 'Server' }}
          </div>
        </ExploreDataItem>
      </div>
    </div>

    <div v-if="website.plugins.length" class="mb-10">
      <div class="label mb-4">
        <AppWebsiteDataLabel>
          <PluginsIcon class="h-6 mr-2 opacity-50" />
          Plugins
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap">
        <a
          v-for="plugin in website.plugins"
          :key="plugin.id"
          :href="plugin.url"
          target="_blank"
          class="mr-4 mb-4"
        >
          <span
            class="block bg-grey-50 border border-grey-200 font-bold-body-weight px-4 py-2 rounded-xl"
          >
            {{ plugin.name }}
          </span>
        </a>
      </div>
    </div>

    <div v-if="website.modules.length" class="mb-10">
      <div class="label mb-4">
        <AppWebsiteDataLabel>
          <ModulesIcon class="h-6 mr-2 opacity-50" />
          Nuxt Modules
        </AppWebsiteDataLabel>
      </div>
      <div class="data-wrapper flex flex-wrap">
        <a
          v-for="module in website.modules"
          :key="module.id"
          :href="module.url"
          target="_blank"
          class="mr-4 mb-4"
        >
          <span
            class="block bg-grey-50 border border-grey-200 font-bold-body-weight px-4 py-2 rounded-xl"
          >
            {{ module.name }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'
// import XmarkCircleFillIcon from '@/assets/icons/xmark-circle-fill.svg?inline'
// import CheckmarkCircleFillIcon from '@/assets/icons/checkmark-circle-fill.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'
// import VueIcon from '@/assets/brands/vue.svg?inline'
import ModulesIcon from '@/assets/icons/modules.svg?inline'
import PluginsIcon from '@/assets/icons/plugins.svg?inline'
// import ConfigIcon from '@/assets/icons/config.svg?inline'
import InfoIcon from '@/assets/icons/info.svg?inline'

export default {
  components: {
    // XmarkCircleIcon,
    // XmarkCircleFillIcon,
    // CheckmarkCircleFillIcon,
    LinkIcon,
    // VueIcon,
    ModulesIcon,
    PluginsIcon,
    // ConfigIcon,
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
.hero-image {
  padding-bottom: 56.25%;
}
.hero-image:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-image img {
  object-fit: cover;
  object-position: top;
}

.hero-info {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  width: 100%;
}

.twitter-like .header {
  @apply px-8;
}
.twitter-like .description {
  @apply px-8;
}
.twitter-like .label {
  @apply px-8;
}
.twitter-like .image {
  @apply rounded-none;
}
.twitter-like .data-wrapper {
  @apply px-8;
}
</style>
