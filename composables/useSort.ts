function filterSort (raw) {
  return Object.keys(raw)
    .filter(key => key === '_sort')
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

export const useSort = () => {
  const route = useRoute()

  const selectedSort = useState('selectedSort', () => ({
    _sort: 'lastDetectedAt:desc'
  }))

  function setSort (sort) {
    selectedSort.value = sort
  }

  setSort(filterSort({ ...selectedSort.value, ...route.query }))

  return {
    selectedSort,
    setSort
  }
}
