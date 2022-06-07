import { useState, useAsyncData } from '#imports'

export const useSort = () => {
  const selectedSort = useState('selectedSort', () => ({
    _sort: 'lastDetectedAt:desc'
  }))

  function setSort(sort) {
    selectedSort.value = sort
  }
  return {
    selectedSort,
    setSort
  }
}
