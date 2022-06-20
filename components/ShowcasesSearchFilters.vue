<template>
  <div class="px-2">
    <ShowcasesSearchInput class="mb-4" @searching="$emit('searching')" />
    <div class="mb-4 flex items-center">
      <div class="mr-2 text-grey-700">Vue 3 only</div>
      <AppSwitch
        :value="selectedFilters.vueVersion_gte ? true : false"
        @input="setVueThreeOnly($event)"
      />
    </div>

    {{ selectedFilters }}
  </div>
</template>

<script setup lang="ts">
const { selectedFilters, setFilterKey, deleteFilterKey } = useFilters()

function setVueThreeOnly(value) {
  if (value) {
    setFilterKey({
      key: 'vueVersion_gte',
      value: 3
    })
  } else {
    deleteFilterKey('vueVersion_gte')
  }
}
</script>
