import type { Filters } from '~/types'

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

  const selectedFilters = useState('selectedFilters', () => ({} as Filters))

  function setFilters (filters: Filters) {
    selectedFilters.value = filterFilters(filters)
  }

  function resetFilters () {
    selectedFilters.value = {}
  }

  function setFilterKey ({ key, value }) {
    selectedFilters.value = { ...selectedFilters.value, [key]: value }
  }

  function deleteFilterKey (key: string) {
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
