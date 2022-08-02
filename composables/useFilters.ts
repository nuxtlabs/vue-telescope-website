import { useState } from '#imports'

const allowedFilters = [
  '_q',
  'framework.slug',
  'framework_null',
  'ui.slug',
  'ui_null',
  'plugins.slug',
  'modules.slug',
  'vueVersion_gte'
]

function filterFilters (raw) {
  return Object.keys(raw)
    .filter(key => allowedFilters.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

export const useFilters = () => {
  const route = useRoute()

  const selectedFilters = useState('selectedFilters', () => ({}))

  function setFilters (filters) {
    selectedFilters.value = filterFilters(filters)
  }

  function resetFilters () {
    selectedFilters.value = {}
  }

  function setFilterKey ({ key, value }) {
    selectedFilters.value = { ...selectedFilters.value, [key]: value }
  }

  function deleteFilterKey (key) {
    delete selectedFilters.value[key]
  }

  setFilters({ ...selectedFilters.value, ...route.query })

  return {
    selectedFilters,
    setFilters,
    resetFilters,
    setFilterKey,
    deleteFilterKey
  }
}
