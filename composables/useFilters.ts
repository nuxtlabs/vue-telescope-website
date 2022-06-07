import { useState, useAsyncData } from '#imports'

export const useFilters = () => {
  const selectedFilters = useState('selectedFilters', () => ({}))

  function setFilters(filters) {
    selectedFilters.value = filters
  }
  return {
    selectedFilters,
    setFilters
  }
}

// SET_FILTERS(state, filters) {
//   state.selectedFilters = filters
// },
// RESET_FILTERS(state) {
//   state.selectedFilters = {}
// },
// SET_FILTER_KEY(state, { key, value }) {
//   // console.log('SET_FILTER_KEY', this)
//   Vue.set(state.selectedFilters, key, value)
// },
// DELETE_FILTER_KEY(state, key) {
//   // console.log('DELETE_FILTER_KEY')
//   Vue.delete(state.selectedFilters, key)
// },
