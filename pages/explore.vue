<template>
  <div class="mb-8">
    <ExplorePage
      v-if="!$route.params.showcase || ($route.params.showcase && !directHit)"
    />

    <NuxtPage :key="$route.params.showcase" />
  </div>
</template>

<script setup lang="ts">
const { $directHit: directHit } = useNuxtApp()

await fetchTechnologies()

const { frameworks, uis } = useTechnologies().value
const { selectedFilters } = useFilters()

const title = computed(() => {
  if (!selectedFilters.value['framework.slug'] && !selectedFilters.value['ui.slug']) {
    return 'Explore Vue.js websites'
  } else {
    let selectedFrameworkName: string
    let selectedUiName: string

    if (selectedFilters.value['framework.slug']) {
      const { name } = frameworks.find(f => f.slug === selectedFilters.value['framework.slug'])
      selectedFrameworkName = name
    }
    if (selectedFilters.value['ui.slug']) {
      const { name } = uis.find(u => u.slug === selectedFilters.value['ui.slug'])
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

watch(title, (newValue) => {
  useFrontMatter({
    title: newValue
  })
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
