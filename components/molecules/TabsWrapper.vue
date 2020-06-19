<template>
  <div class="tabs-wrapper-molecule">
    {{ activeTab }}
    <AppButton
      v-for="(tab, i) in tabs"
      :key="i"
      :class="[
        (activeTab.id === tab.id || transitioning) && 'pointer-events-none'
      ]"
      class="select-none"
      @click.native="startTransition(tab)"
    >
      {{ tab.title }}
    </AppButton>
    <!-- <slot></slot> -->

    <component :is="activeTab.component" :ref="activeTab.component" />
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
      activeTab: tabs[0],
      tabs
    }
  },
  methods: {
    async startTransition(tab) {
      this.transitioning = true
      await this.$refs[this.activeTab.component].leave()
      this.transitioning = false
      this.activeTab = tab
    }
  }
}
</script>

<style></style>
