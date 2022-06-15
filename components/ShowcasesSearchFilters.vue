<template>
  <div class="px-2">
    {{ selectedFilters }}
    <ShowcasesSearchInput class="mb-4" @searching="$emit('searching')" />
  </div>
</template>

<script setup lang="ts">
const { selectedFilters } = useFilters()
</script>
