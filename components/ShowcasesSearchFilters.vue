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

    <div class="mb-4">
      <AppFilterLabel>Framework</AppFilterLabel>
      <div class="flex flex-col">
        <AppRadio
          :id="`framework-null`"
          :checked="Boolean(selectedFilters['framework_null'])"
          class="mb-1"
          @input="selectNoFramework"
        >
          <div class="flex items-center">
            <img
              class="w-4 h-4 mr-1"
              :src="`${$config.iconsURL}/vue.svg`"
              alt="Vue"
            />
            <span>Vue</span>
          </div>
        </AppRadio>
        <template v-for="framework in frameworks" :key="framework.id" class="">
          <AppRadio
            :id="`framework-${framework.slug}`"
            :checked="
              selectedFilters['framework.slug'] &&
              selectedFilters['framework.slug'].includes(framework.slug)
            "
            class="mb-1"
            @input="radioFilter('framework.slug', framework.slug)"
          >
            <div class="flex items-center">
              <img
                class="w-4 h-4 mr-1"
                :src="`${$config.iconsURL}${framework.imgPath}`"
                :alt="framework.name"
              />
              <span>{{ framework.name }}</span>
            </div>
          </AppRadio>
        </template>
      </div>
    </div>

    {{ selectedFilters }}
  </div>
</template>

<script setup lang="ts">
const { selectedFilters, setFilterKey, deleteFilterKey } = useFilters()
const { frameworks, modules, plugins, uis } = await useTechnologies()

defineExpose({
  clearFilter
})

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

function selectNoFramework() {
  deleteFilterKey('framework.slug')
  setFilterKey({
    key: 'framework_null',
    value: true
  })
}

function radioFilter(key, value) {
  if (selectedFilters[key] === value) {
    deleteFilterKey(key)
  } else {
    setFilterKey({
      key,
      value
    })
  }

  // cleanup NONE selection
  if (key === 'framework.slug') {
    deleteFilterKey('framework_null')
  }
  if (key === 'ui.slug') {
    deleteFilterKey('ui_null')
  }
}

function clearFilter(key) {
  deleteFilterKey(key)
}

// clearFilters() {
//   setTimeout(() => {
//     this.$store.commit('RESET_FILTERS')
//   })
// },
// clearFilter(key) {
//   this.$store.commit('DELETE_FILTER_KEY', key)
// }
</script>
