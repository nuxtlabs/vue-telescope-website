<template>
  <div v-if="website">
    <div class="hero-image relative overflow-hidden mb-4">
      <img
        :src="website.screenshotUrl"
        alt=""
        class="absolute top-0 left-0 w-full h-full"
      />
      <div
        class="absolute top-0 right-0 z-10 p-4 cursor-pointer pointer-events-auto"
        @click="$router.push('/explore')"
      >
        <XmarkCircleIcon class="text-white w-8 h-8" />
      </div>
      <div class="absolute bottom-0 right-0 z-10 p-4">
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
      </div>
    </div>
    <div class="mb-4 p-4">
      <h1 class="text-five leading-five font-display-weight mb-2">
        {{ website.title }}
      </h1>
      <p>{{ website.description }}</p>
    </div>
    <div v-if="website.ui">
      <h2>UI:</h2>
      <img
        :src="require(`~/assets/brands/${website.ui.slug}.svg`)"
        alt=""
        class="w-8 h-8"
      />
      <div>{{ website.ui.name }}</div>
    </div>
    <div v-if="website.framework">
      <h2>Framework:</h2>
      <img
        :src="require(`~/assets/brands/${website.framework.slug}.svg`)"
        alt=""
        class="w-8 h-8"
      />
      <div>{{ website.framework.name }}</div>
    </div>
  </div>
</template>

<script>
import XmarkCircleIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  components: {
    XmarkCircleIcon
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
  background-image: linear-gradient(
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
  );
  pointer-events: none;
}
.hero-image:before {
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
}

.hero-image img {
  object-fit: cover;
  object-position: top;
}
</style>
