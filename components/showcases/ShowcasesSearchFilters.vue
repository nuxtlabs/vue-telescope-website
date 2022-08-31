<template>
  <div class="px-2">
    <ShowcasesSearchInput class="mb-4" @searching="$emit('searching')" />

    <div class="flex items-center mb-4">
      <div class="mr-2 text-grey-700">
        Vue 3 only
      </div>
      <AppSwitch
        :value="selectedFilters.vueVersion_gte ? true : false"
        @input="setVueThreeOnly($event)"
      />
    </div>

    <div class="mb-4">
      <ShowcasesFilterLabel>Framework</ShowcasesFilterLabel>
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
              :src="`${config.iconsURL}/vue.svg`"
              alt="Vue"
            >
            <span>Vue</span>
          </div>
        </AppRadio>
        <AppRadio
          v-for="framework in frameworks"
          :id="`framework-${framework.slug}`"
          :key="framework.id"
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
              :src="`${config.iconsURL}${framework.imgPath}`"
              :alt="framework.name"
            >
            <span>{{ framework.name }}</span>
          </div>
        </AppRadio>
      </div>
    </div>

    <div class="mb-4">
      <ShowcasesFilterLabel>UI Framework</ShowcasesFilterLabel>
      <div class="flex flex-col">
        <AppRadio
          :id="`ui-null`"
          :checked="Boolean(selectedFilters['ui_null'])"
          class="mb-1"
          @input="selectNoUIFramework"
        >
          <span>None</span>
        </AppRadio>
        <AppRadio
          v-for="ui in uis"
          :id="`ui-${ui.slug}`"
          :key="ui.id"
          :checked="
            selectedFilters['ui.slug'] &&
              selectedFilters['ui.slug'].includes(ui.slug)
          "
          class="mb-1"
          @input="radioFilter('ui.slug', ui.slug)"
        >
          <div class="flex items-center">
            <img
              class="w-4 h-4 mr-1"
              :src="`${config.iconsURL}${ui.imgPath}`"
              :alt="ui.name"
            >
            <span>{{ ui.name }}</span>
          </div>
        </AppRadio>
      </div>
    </div>

    <div class="mb-4">
      <ShowcasesFilterLabel>Plugins</ShowcasesFilterLabel>
      <div class="flex flex-col">
        <AppCheckbox
          v-for="plugin in plugins"
          :id="`plugin-${plugin.slug}`"
          :key="plugin.id"
          :checked="
            selectedFilters['plugins.slug'] &&
              selectedFilters['plugins.slug'].includes(plugin.slug)
          "
          class="mb-1"
          :label="plugin.name"
          @input="checkboxFilter('plugins.slug', plugin.slug)"
        />
      </div>
    </div>

    <div v-show="selectedFilters['framework.slug'] === 'nuxtjs'" class="mb-4">
      <ShowcasesFilterLabel>Modules</ShowcasesFilterLabel>
      <div class="flex flex-col">
        <AppCheckbox
          v-for="_module in modules"
          :id="`module-${_module.slug}`"
          :key="_module.id"
          :checked="
            selectedFilters['modules.slug'] &&
              selectedFilters['modules.slug'].includes(_module.slug)
          "
          class="mb-1"
          :label="_module.name"
          @input="checkboxFilter('modules.slug', _module.slug)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { selectedFilters, setFilterKey, deleteFilterKey, resetFilters } =
  useFilters()
const { frameworks, modules, plugins, uis } = useTechnologies().value

const config = useRuntimeConfig().public

defineExpose({
  clearFilter,
  clearFilters
})

function setVueThreeOnly (value) {
  if (value) {
    setFilterKey({
      key: 'vueVersion_gte',
      value: 3
    })
  } else {
    deleteFilterKey('vueVersion_gte')
  }
}

function selectNoFramework () {
  deleteFilterKey('framework.slug')
  setFilterKey({
    key: 'framework_null',
    value: true
  })
}

function selectNoUIFramework () {
  deleteFilterKey('ui.slug')
  setFilterKey({
    key: 'ui_null',
    value: true
  })
}

function radioFilter (key, value) {
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

function checkboxFilter (key, value) {
  if (!selectedFilters.value[key]) {
    setFilterKey({
      key,
      value: [value]
    })
  } else if (selectedFilters.value[key].includes(value)) {
    const filteredArray = selectedFilters.value[key].filter(i => i !== value)
    setFilterKey({
      key,
      value: [...filteredArray]
    })
    if (!filteredArray.length) {
      // if array is empty - delete key
      deleteFilterKey(key)
    }
  } else {
    setFilterKey({
      key,
      value: [...selectedFilters.value[key], value]
    })
  }
}

function clearFilter (key) {
  deleteFilterKey(key)
}

function clearFilters () {
  resetFilters()
}
</script>
