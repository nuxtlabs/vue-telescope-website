<template>
  <div class="tabs-wrapper-molecule flex">
    <!-- <pre>{{ activeTabs }}</pre> -->
    <div class="w-1/4 flex flex-col mx-2">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        :class="[
          (activeTabs.length > 1
            ? activeTabs[1].id === tab.id
            : activeTabs[0].id === tab.id) && 'pointer-events-none bg-grey-300'
        ]"
        class="h-12 text-eight font-bold-body-weight px-4 rounded-xl focus:outline-none border-2 border-transparent select-none mb-2"
        @click="startTransition(tab)"
      >
        {{ tab.title }}
      </button>
    </div>

    <transition-group
      tag="div"
      class="w-3/4 relative h-24 mx-2 rounded-xl overflow-hidden"
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
  { id: 1, title: 'Feature One', component: 'FeatureTabsOne' },
  { id: 2, title: 'Feature Two', component: 'FeatureTabsTwo' },
  { id: 3, title: 'Feature Three', component: 'FeatureTabsThree' }
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
      tabs
    }
  },
  methods: {
    async startTransition(tab) {
      if (!this.activeTabs.some((t) => t.id === tab.id)) {
        this.activeTabs.push(tab)
        this.transitioning = true
        await this.$refs.content[0].leave()
        this.transitioning = false
        this.activeTabs.shift()
      }
    }
  }
}
</script>

<style></style>
