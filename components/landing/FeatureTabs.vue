<template>
  <div class="tabs-wrapper-molecule flex flex-col lg:flex-row">
    <!-- <pre>{{ activeTabs }}</pre> -->
    <div
      class="relative z-20 w-auto lg:w-1/4 flex flex-col items-center lg:items-start mx-4 mb-2"
    >
      <h2
        class="text-center lg:text-left text-five leading-five font-display-weight my-4 lg:mb-8 lg:mt-24 lg:ml-4"
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
          class="h-12 text-grey-500 text-base leading-base font-bold-body-weight px-4 rounded-xl focus:outline-none border-2 border-transparent select-none mb-2 has-hover:hover:bg-grey-50 transition-colors duration-200"
          @click="startManualTransition(tab)"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>

    <!-- <component
      :is="'FeatureTabsOne'"
      :surface-color="activeTabs[0].surfaceColor"
      :on-surface-color="activeTabs[0].onSurfaceColor"
      :description="activeTabs[0].description"
      :image="activeTabs[0].image"
    /> -->
    <div class="w-auto lg:w-3/4 h-128 relative mx-2 overflow-visible">
      <transition-group>
        <component
          :is="activeTab.component"
          v-for="activeTab in activeTabs"
          :key="activeTab.id + activeTab.component"
          ref="contentRef"
          :surface-color="activeTab.surfaceColor"
          :on-surface-color="activeTab.onSurfaceColor"
          :description="activeTab.description"
          :image="activeTab.image"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  {
    id: 1,
    title: 'Detect Vue technologies',
    description:
      'Vue Telescope can detect any website built with Vue.js frameworks, like Nuxt, Gridsome, Quasar or VuePress. It can also tell you which UI/CSS framework was used: TailwindCSS, Vuetify, Buefy etc. And much more!',
    component: 'FeatureTabsOne',
    surfaceColor: '#fffee1',
    onSurfaceColor: 'rgba(247, 213, 14, 0.99)',
    image: '/images/detect.png'
  },
  {
    id: 2,
    title: 'Explore & filter',
    description:
      'Explore our showcase of websites build with Vue.js and use the filter to see projects built with a particular framework and/or UI library. You can also filter by plugins as well as Nuxt.js modules.',
    component: 'FeatureTabsTwo',
    surfaceColor: 'rgba(225, 245, 255, 1)',
    onSurfaceColor: 'rgba(79, 196, 255, 0.99)',
    image: '/images/explore.png'
  },
  {
    id: 3,
    title: 'Submit your website',
    description:
      'You can manually submit your site or any site built using any of the Vue.js frameworks by adding it to the input and clicking "Look up". If we don\'t already have the site in our database we will scan it and add it in no more than 20 seconds.',
    component: 'FeatureTabsThree',
    surfaceColor: 'rgba(245, 233, 255, 1)',
    onSurfaceColor: 'rgb(187, 130, 255, 0.99)',
    image: '/images/submit.png'
  }
]

const autoSwitchTimeout = 5000

const transitioning = ref(false)
const activeTabs = ref([tabs[0]])
const autoInterval = ref(null)

const contentRef = ref([])

async function startManualTransition (tab) {
  if (activeTabs.value.length >= 2) { return }
  if (!activeTabs.value.some(t => t.id === tab.id)) {
    clearInterval(autoInterval.value)
    await animateSwitchTabs(tab)
    setTimeout(() => {
      clearInterval(autoInterval.value)
      autoInterval.value = setInterval(() => {
        animateSwitchTabs(getNextTab())
      }, autoSwitchTimeout)
    }, 2000)
  }
}
async function animateSwitchTabs (tab) {
  if (document.hidden) { return }
  if (!contentRef.value[0]) { return }
  activeTabs.value.push(tab)
  transitioning.value = true
  await contentRef.value[0].leave()
  transitioning.value = false
  activeTabs.value.shift()
}
function getNextTab () {
  return activeTabs.value[0].id === tabs.length
    ? tabs[0]
    : tabs[activeTabs.value[0].id]
}

onMounted(() => {
  autoInterval.value = setInterval(() => {
    animateSwitchTabs(getNextTab())
  }, autoSwitchTimeout)
})
</script>
