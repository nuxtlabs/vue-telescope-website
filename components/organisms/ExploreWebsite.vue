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
      <!-- <div
        class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
        @click="$router.push('/explore')"
      >
        <XmarkCircleIcon class="text-white w-8 h-8" />
      </div> -->
      <!-- <div class="absolute bottom-0 right-0 z-10 p-4">
        <AppButton
          appearance="info"
          size="small"
          tag="a"
          :href="website.url"
          target="_blank"
          class="rounded-full"
        >
          Visit
        </AppButton>
      </div> -->
      <!-- 
      <div class="hero-info">
        <div
          class="pt-5 mb-4 text-center text-white font-bold-body-weight tracking-4"
        >
          {{ website.hostname }}
        </div>
        <h1
          class="px-4 text-center text-five leading-five md:text-three md:leading-three font-display-weight mb-2 text-white"
        >
          {{ website.title }}
        </h1>
      </div> -->
    </div>

    <div class="mb-10 px-8">
      <!-- <div class="flex items-center justify-center mb-2">
        <span class="w-3 h-3 rounded-full bg-grey-600 mr-2"></span>
        <span
          class="text-sm leading-sm uppercase font-bold-body-weight tracking-2 text-grey-600"
        >
          About
        </span>
      </div> -->
      <!-- <h1
        class="text-five leading-five md:text-three md:leading-three font-display-weight mb-2"
      >
        {{ website.title }}
      </h1> -->
      <p>{{ website.description }}</p>
    </div>

    <div class="flex flex-wrap px-8 mb-10">
      <div class="flex flex-col items-center w-1/3">
        <VueIcon class="w-12 h-12" />
        <div class="text-eight font-bold-body-weight">
          {{ website.vueVersion }}
        </div>
      </div>
      <div class="flex flex-col items-center w-1/3">
        <div class="text-six leading-six font-bold-body-weight h-12">SSR</div>
        <CheckmarkCircleFillIcon
          v-if="website.hasSSR"
          class="w-8 text-green-500"
        />
        <XmarkCircleFillIcon v-else class="w-8 text-grey-400" />
      </div>
      <div class="flex flex-col items-center w-1/3">
        <div class="text-six leading-six font-bold-body-weight h-12">
          Static
        </div>
        <CheckmarkCircleFillIcon
          v-if="website.isStatic"
          class="w-8 text-green-500"
        />
        <XmarkCircleFillIcon v-else class="w-8 text-grey-400" />
      </div>
    </div>

    <template v-if="website.framework">
      <div class="flex items-center px-8 mb-4">
        <div class="w-1/3">
          <div class="text-six leading-six font-bold-body-weight">
            Framework:
          </div>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <a class="" :href="website.framework.url" target="_blank">
            <div
              class="p-3 rounded-full"
              :class="[`bg-${website.framework.slug}-light`]"
            >
              <img
                :src="require(`~/assets/brands/${website.framework.slug}.svg`)"
                alt=""
                class="w-8 h-8"
              />
            </div>
          </a>
        </div>
        <div class="w-1/3"></div>
      </div>
    </template>

    <!-- <div v-if="website.ui">
      <h2 class="text-six font-display-weight">UI:</h2>
      <img
        :src="require(`~/assets/brands/${website.ui.slug}.svg`)"
        alt=""
        class="w-8 h-8"
      />
      <ExternalLink :url="website.ui.url" :text="website.ui.name" />
    </div> -->

    <template v-if="website.ui">
      <div class="flex items-center px-8 py-4">
        <div class="w-1/3">
          <div class="text-six leading-six font-bold-body-weight">
            UI:
          </div>
        </div>
        <div class="w-1/3 flex items-center justify-center">
          <a class="" :href="website.ui.url" target="_blank">
            <div
              class="p-3 rounded-full"
              :class="[`bg-${website.ui.slug}-light`]"
            >
              <img
                :src="require(`~/assets/brands/${website.ui.slug}.svg`)"
                alt=""
                class="w-8 h-8"
              />
            </div>
          </a>
        </div>
        <div class="w-1/3"></div>
      </div>
    </template>

    <template v-if="website.plugins.length">
      <div class="flex items-start px-8 py-4">
        <div class="w-1/2">
          <div class="text-six leading-six font-bold-body-weight">
            Plugins:
          </div>
        </div>
        <div class="w-1/2 flex flex-wrap -ml-6">
          <a
            v-for="plugin in website.plugins"
            :key="plugin.id"
            :href="plugin.url"
            target="_blank"
            class="mr-2 mb-2 bg-primary-50 text-primary-700 font-bold-body-weight px-3 py-1 rounded-xl"
          >
            {{ plugin.name }}
            <!-- <ExternalLink :url="plugin.url" :text="plugin.name" /> -->
          </a>
        </div>
      </div>
    </template>

    <template v-if="website.modules.length">
      <div class="flex items-start px-8 py-4">
        <div class="w-1/2">
          <div class="text-six leading-six font-bold-body-weight">
            Modules:
          </div>
        </div>
        <div class="w-1/2 flex flex-wrap -ml-6">
          <a
            v-for="module in website.modules"
            :key="module.id"
            :href="module.url"
            target="_blank"
            class="mr-2 mb-2 bg-primary-50 text-primary-700 font-bold-body-weight px-3 py-1 rounded-xl"
          >
            {{ module.name }}
            <!-- <ExternalLink :url="plugin.url" :text="plugin.name" /> -->
          </a>
        </div>
      </div>
    </template>

    <!-- <div v-if="website.modules.length">
      <h2 class="text-six font-display-weight">Modules:</h2>
      <div v-for="module in website.modules" :key="module.id">
        <ExternalLink :url="module.url" :text="module.name" />
      </div>
    </div> -->
  </div>
</template>

<script>
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'
import XmarkCircleFillIcon from '@/assets/icons/xmark-circle-fill.svg?inline'
import CheckmarkCircleFillIcon from '@/assets/icons/checkmark-circle-fill.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'
import VueIcon from '@/assets/brands/vue.svg?inline'

export default {
  components: {
    XmarkCircleIcon,
    XmarkCircleFillIcon,
    CheckmarkCircleFillIcon,
    LinkIcon,
    VueIcon
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
