<template>
  <div class="tabs-wrapper-molecule flex flex-col md:flex-row">
    <!-- <pre>{{ activeTabs }}</pre> -->
    <div class="md:w-1/4 flex flex-col mx-2">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :class="[
          (activeTabs.length > 1
            ? activeTabs[1].id === tab.id
            : activeTabs[0].id === tab.id) && 'pointer-events-none bg-grey-300'
        ]"
        class="h-12 text-eight font-bold-body-weight px-4 rounded-xl focus:outline-none border-2 border-transparent select-none mb-2"
        @click="startManualTransition(tab)"
      >
        {{ tab.title }}
      </button>
    </div>

    <transition-group
      tag="div"
      class="md:w-3/4 relative h-24 mx-2 rounded-xl overflow-hidden"
    >
      <component
        :is="activeTab.component"
        v-for="activeTab in activeTabs"
        :key="activeTab.id + activeTab.component"
        ref="content"
      />
    </transition-group>
  </div>
</template>

<script>
import FeatureTabsOne from './FeatureTabsOne'
import FeatureTabsTwo from './FeatureTabsTwo'
import FeatureTabsThree from './FeatureTabsThree'

const tabs = [
  { id: 1, title: 'Detect Vue technologies', component: 'FeatureTabsOne' },
  { id: 2, title: 'Explore & filter', component: 'FeatureTabsTwo' },
  { id: 3, title: 'Submit your website', component: 'FeatureTabsThree' }
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
      autoInterval: null
    }
  },
  mounted() {
    this.autoInterval = setInterval(() => {
      this.animateSwitchTabs(this.getNextTab())
    }, 5000)
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
          }, 5000)
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
