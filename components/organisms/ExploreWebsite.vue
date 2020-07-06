<template>
  <div v-if="website" class="pointer-events-auto">
    <div class="relative px-8 pt-14 pb-8 flex justify-between items-center">
      <div
        class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
        @click="$router.push('/explore')"
      >
        <XmarkCircleIcon class="text-grey-900 w-6 h-6" />
      </div>
      <div class="relative">
        <h1
          class="truncate-multiline-2 pr-4 text-five leading-five md:text-five md:leading-five font-display-weight"
        >
          {{ website.title }}
        </h1>
        <a
          :href="website.url"
          target="_blank"
          class="h-6 absolute top-0 left-0 flex -mt-6 text-primary-300 font-bold-body-weight"
        >
          <LinkIcon class="w-3 mr-2" />
          <span class="">{{ website.hostname }}</span>
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

    <div class="hero-image bg-primary-50 relative overflow-hidden mb-8">
      <img
        :src="website.screenshotUrl"
        alt=""
        class="absolute top-0 left-0 w-full h-full"
      />
    </div>

    <div class="mb-10 px-8">
      <p class="text-eight leading-eight">{{ website.description }}</p>
    </div>

    <div class="mb-10">
      <div class="px-8 mb-4">
        <h3
          class="flex items-center font-display-weight pl-2 text-eight text-primary-700 uppercase"
        >
          <ConfigIcon class="h-5 mr-2 text-primary-700 opacity-25" />
          Info
        </h3>
      </div>
      <div class="flex flex-wrap px-6">
        <ExploreDataItem>
          <VueIcon class="w-8 h-8" />
          <div class="text-eight font-bold-body-weight">
            {{ website.vueVersion }}
          </div>
        </ExploreDataItem>

        <ExploreDataItem>
          <div class="text-seven leading-seven font-bold-body-weight mr-2">
            SSR
          </div>
          <div class="w-8 h-8 flex items-center justify-center">
            <CheckmarkCircleFillIcon
              v-if="website.hasSSR"
              class="w-6 text-green-500"
            />
            <XmarkCircleFillIcon v-else class="w-6 text-grey-400" />
          </div>
        </ExploreDataItem>

        <ExploreDataItem>
          <div class="text-seven leading-seven font-bold-body-weight mr-2">
            Static
          </div>
          <div class="w-8 h-8 flex items-center justify-center">
            <CheckmarkCircleFillIcon
              v-if="website.isStatic"
              class="w-6 text-green-500"
            />
            <XmarkCircleFillIcon v-else class="w-6 text-grey-400" />
          </div>
        </ExploreDataItem>

        <ExploreDataItem v-if="website.framework">
          <div class="text-seven leading-seven font-bold-body-weight mr-2">
            Framework
          </div>
          <a :href="website.framework.url" target="_blank" class="">
            <img
              :src="require(`~/assets/brands/${website.framework.slug}.svg`)"
              alt=""
              class="w-8 h-8"
            />
          </a>
        </ExploreDataItem>

        <ExploreDataItem v-if="website.ui">
          <div class="text-seven leading-seven font-bold-body-weight mr-2">
            UI Framework
          </div>
          <a :href="website.ui.url" target="_blank" class="">
            <img
              :src="require(`~/assets/brands/${website.ui.slug}.svg`)"
              alt=""
              class="w-8 h-8"
            />
          </a>
        </ExploreDataItem>
      </div>
    </div>

    <div v-if="website.plugins.length" class="mb-10">
      <div class="px-8 mb-4">
        <h3
          class="flex items-center font-display-weight pl-2 text-eight text-primary-700 uppercase"
        >
          <PluginsIcon class="h-6 mr-2 text-primary-700 opacity-25" />
          Plugins
        </h3>
      </div>
      <div class="flex flex-wrap px-8">
        <a
          v-for="plugin in website.plugins"
          :key="plugin.id"
          :href="plugin.url"
          target="_blank"
          class="mr-4 mb-4"
        >
          <span
            class="block bg-grey-50 font-bold-body-weight px-4 py-2 rounded-xl"
          >
            {{ plugin.name }}
          </span>
        </a>
      </div>
    </div>

    <div v-if="website.modules.length" class="mb-10">
      <div class="px-8 mb-4">
        <h3
          class="flex items-center font-display-weight pl-2 text-eight text-primary-700 uppercase"
        >
          <ModulesIcon class="h-6 mr-2 text-primary-700 opacity-25" />
          Nuxt Modules
        </h3>
      </div>
      <div class="flex flex-wrap px-8">
        <a
          v-for="module in website.modules"
          :key="module.id"
          :href="module.url"
          target="_blank"
          class="mr-4 mb-4"
        >
          <span
            class="block bg-grey-50 font-bold-body-weight px-4 py-2 rounded-xl"
          >
            {{ module.name }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'
import XmarkCircleFillIcon from '@/assets/icons/xmark-circle-fill.svg?inline'
import CheckmarkCircleFillIcon from '@/assets/icons/checkmark-circle-fill.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'
import VueIcon from '@/assets/brands/vue.svg?inline'
import ModulesIcon from '@/assets/icons/modules.svg?inline'
import PluginsIcon from '@/assets/icons/plugins.svg?inline'
import ConfigIcon from '@/assets/icons/config.svg?inline'

export default {
  components: {
    XmarkCircleIcon,
    XmarkCircleFillIcon,
    CheckmarkCircleFillIcon,
    LinkIcon,
    VueIcon,
    ModulesIcon,
    PluginsIcon,
    ConfigIcon
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
  /* background: hsla(0, 0%, 0%, 0.75); */
  /* background-image: linear-gradient(
    to bottom,
    hsla(0, 0%, 0%, 0.5) 0%,
    hsla(0, 0%, 0%, 0.427) 3.6%,
    hsla(0, 0%, 0%, 0.36) 7.7%,
    hsla(0, 0%, 0%, 0.3) 12.3%,
    hsla(0, 0%, 0%, 0.247) 17.3%,
    hsla(0, 0%, 0%, 0.199) 22.8%,
    hsla(0, 0%, 0%, 0.158) 28.7%,
    hsla(0, 0%, 0%, 0.122) 35.1%,
    hsla(0, 0%, 0%, 0.091) 41.8%,
    hsla(0, 0%, 0%, 0.065) 49%,
    hsla(0, 0%, 0%, 0.044) 56.5%,
    hsla(0, 0%, 0%, 0.027) 64.5%,
    hsla(0, 0%, 0%, 0.015) 72.8%,
    hsla(0, 0%, 0%, 0.007) 81.5%,
    hsla(0, 0%, 0%, 0.002) 90.6%,
    hsla(0, 0%, 0%, 0) 100%
  ); */
  pointer-events: none;
}
/* .hero-image:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    hsla(0, 0%, 100%, 0) 0%,
    hsla(0, 0%, 100%, 0.002) 17.5%,
    hsla(0, 0%, 100%, 0.008) 32.8%,
    hsla(0, 0%, 100%, 0.019) 46.1%,
    hsla(0, 0%, 100%, 0.035) 57.6%,
    hsla(0, 0%, 100%, 0.056) 67.3%,
    hsla(0, 0%, 100%, 0.083) 75.4%,
    hsla(0, 0%, 100%, 0.117) 82%,
    hsla(0, 0%, 100%, 0.158) 87.4%,
    hsla(0, 0%, 100%, 0.206) 91.6%,
    hsla(0, 0%, 100%, 0.261) 94.7%,
    hsla(0, 0%, 100%, 0.325) 97%,
    hsla(0, 0%, 100%, 0.397) 98.5%,
    hsla(0, 0%, 100%, 0.478) 99.4%,
    hsla(0, 0%, 100%, 0.569) 99.9%,
    hsla(0, 0%, 100%, 0.67) 100%
  );
  pointer-events: none;
} */

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
</style>
