<template>
  <div class="tabs-wrapper-molecule flex flex-col lg:flex-row">
    <!-- <pre>{{ activeTabs }}</pre> -->
    <div
      class="relative z-20 w-auto lg:w-1/4 flex flex-col items-center lg:items-start mx-4 mb-2"
    >
      <h2
        class="text-center lg:text-left text-five leading-five font-display-weight my-4 lg:my-8 lg:ml-4"
      >
        Must-have tool for any Vue.js developer
      </h2>
      <div class="flex flex-col lg:items-start">
        <button
          v-for="(tab, i) in tabs"
          :key="i"
          :class="[
            (activeTabs.length > 1
              ? activeTabs[1].id === tab.id
              : activeTabs[0].id === tab.id) &&
              'pointer-events-none text-grey-900'
          ]"
          :style="
            (activeTabs.length > 1
              ? activeTabs[1].id === tab.id
              : activeTabs[0].id === tab.id) &&
            `background-color: ${tab.surfaceColor}`
          "
          class="h-12 text-grey-500 text-base leading-base font-bold-body-weight px-4 rounded-xl focus:outline-none border-2 border-transparent select-none mb-2"
          @click="startManualTransition(tab)"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>

    <transition-group
      tag="div"
      class="w-auto lg:w-3/4 h-128 relative mx-2 overflow-visible"
    >
      <component
        :is="activeTab.component"
        v-for="activeTab in activeTabs"
        :key="activeTab.id + activeTab.component"
        ref="content"
        :surface-color="activeTab.surfaceColor"
        :on-surface-color="activeTab.onSurfaceColor"
        :description="activeTab.description"
        class=""
      />
    </transition-group>
  </div>
</template>

<script>
import FeatureTabsOne from './FeatureTabsOne'
import FeatureTabsTwo from './FeatureTabsTwo'
import FeatureTabsThree from './FeatureTabsThree'

const tabs = [
  {
    id: 1,
    title: 'Detect Vue technologies',
    description:
      'Vue Telemetry can detect any website built with Vue.js frameworks, like Nuxt, Gridsome, Quasar or VuePress. It can also tell you which UI/CSS framework was used: TailwindCSS, Vuetify, Buefy etc. And much more!',
    component: 'FeatureTabsOne',
    surfaceColor: '#fffee1',
    onSurfaceColor: 'rgba(247, 213, 14, 0.99)'
  },
  {
    id: 2,
    title: 'Explore & filter',
    description:
      'Explore our showcase of websites build with Vue.js and use the filter to see projects built with a particular framework and/or UI library. You can also filter by plugins as well as Nuxt.js modules.',
    component: 'FeatureTabsTwo',
    surfaceColor: 'rgba(225, 245, 255, 1)',
    onSurfaceColor: 'rgba(79, 196, 255, 0.99)'
  },
  {
    id: 3,
    title: 'Submit your website',
    description:
      'You can manually submit your site or any site built using any of the Vue.js frameworks by adding it to the input and clicking "Look up". If we don\'t already have the site in our database we will scan it and add it in no more than 20 seconds.',
    component: 'FeatureTabsThree',
    surfaceColor: 'rgba(245, 233, 255, 1)',
    onSurfaceColor: 'rgb(187, 130, 255, 0.99)'
  }
]

export default {
  components: {
    FeatureTabsOne,
    FeatureTabsTwo,
    FeatureTabsThree
  },
  data() {
    return {
      transitioning: false,
      // activeTab: tabs[0],
      activeTabs: [tabs[0]],
      tabs,
      autoInterval: null,
      timeout: 5000
    }
  },
  mounted() {
    this.autoInterval = setInterval(() => {
      this.animateSwitchTabs(this.getNextTab())
    }, this.timeout)
  },
  methods: {
    async startManualTransition(tab) {
      if (this.activeTabs.length >= 2) return
      if (!this.activeTabs.some((t) => t.id === tab.id)) {
        clearInterval(this.autoInterval)
        await this.animateSwitchTabs(tab)
        setTimeout(() => {
          clearInterval(this.autoInterval)
          this.autoInterval = setInterval(() => {
            this.animateSwitchTabs(this.getNextTab())
          }, this.timeout)
        }, 2000)
      }
    },
    async animateSwitchTabs(tab) {
      if (document.hidden) return
      if (!this.$refs.content[0]) return
      this.activeTabs.push(tab)
      this.transitioning = true
      await this.$refs.content[0].leave()
      this.transitioning = false
      this.activeTabs.shift()
    },
    getNextTab() {
      return this.activeTabs[0].id === this.tabs.length
        ? this.tabs[0]
        : this.tabs[this.activeTabs[0].id]
    }
  }
}
</script>

<style></style>
