import { useState, useAsyncData } from '#imports'

export const useFilters = () => {
  const selectedFilters = useState('selectedFilters', () => ({}))

  function setFilters (filters) {
    selectedFilters.value = filters
  }

  function resetFilters () {
    selectedFilters.value = {}
  }

  function setFilterKey ({ key, value }) {
    console.log('setFilterKey', key, value)
    selectedFilters.value = { ...selectedFilters.value, [key]: value }
  }

  function deleteFilterKey (key) {
    delete selectedFilters.value[key]
  }

  return {
    selectedFilters,
    setFilters,
    resetFilters,
    setFilterKey,
    deleteFilterKey
  }
}
