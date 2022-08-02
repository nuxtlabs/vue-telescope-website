<template>
  <div class="pt-12 md:pt-8 mb-8">
    <ExplorePage
      v-if="!$route.params.showcase || ($route.params.showcase && !directHit)"
    />

    <NuxtPage :key="$route.params.showcase" />
  </div>
</template>

<script setup lang="ts">
const { $directHit: directHit } = useNuxtApp()

const { frameworks, uis } = await useTechnologies()
const { selectedFilters } = useFilters()

watch(selectedFilters, () => {
  useFrontMatter({
    title: title.value
  })
})

const title = computed(() => {
  if (!selectedFilters.value['framework.slug'] && !selectedFilters.value['ui.slug']) {
    return 'Explore Vue.js websites'
  } else {
    let selectedFrameworkName
    let selectedUiName

    if (selectedFilters.value['framework.slug']) {
      const { name } = frameworks.value.find(f => f.slug === selectedFilters.value['framework.slug'])
      selectedFrameworkName = name
    }
    if (selectedFilters.value['ui.slug']) {
      const { name } = uis.value.find(u => u.slug === selectedFilters.value['ui.slug'])
      selectedUiName = name
    }
    return `Explore Vue.js websites made with ${
      selectedFrameworkName && selectedUiName
      ? (selectedFrameworkName + ' & ' + selectedUiName)
      : !selectedFrameworkName && selectedUiName
      ? selectedUiName
      : selectedFrameworkName
    }`
  }
})

useFrontMatter({
  title: title.value
})

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
