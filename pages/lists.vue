<template>
  <div class="pt-12 md:pt-8 mb-8">
    <ListsPage />
  </div>
</template>

<script setup lang="ts">
useFrontMatter({
  title: 'Lists',
  noindex: true
})

// TODO: temp solution
if (process.client) {
  setTimeout(() => {
    window.scrollTo({ top: 0 })
  }, 0)
}
</script>
