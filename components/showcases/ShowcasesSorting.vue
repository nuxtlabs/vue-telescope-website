<template>
  <div
    ref="wrapperRef"
    v-click-outside="clickOutsideHandler"
    class="wrapper opacity-0 absolute top-0 right-0 z-10 overflow-hidden rounded-md bg-grey-50 text-grey-900"
  >
    <div
      v-for="option in options"
      :key="option._sort"
      :class="[option._sort === selectedSort._sort && 'font-bold-body-weight']"
      class="p-1 px-2 has-hover:hover:font-bold-body-weight cursor-pointer select-none overflow-hidden"
      @click="selectSorting(option)"
    >
      <div class="flex justify-between items-center">
        <div class="text-sm leading-sm mr-2">
          {{ option.name }}
        </div>
        <ArrowDownIcon class="w-2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { animate, timeline } from 'motion'
import ArrowDownIcon from '@/assets/icons/arrow-down.svg'

const { selectedSort, setSort } = useSort()

const wrapperRef = ref(null)

const isOpened = ref(false)
const optionHeight = 28
const borderWidth = 0

const options = ref([
  {
    name: 'Popularity',
    _sort: 'rank:asc',
    icon: 'ArrowDownIcon'
  },
  {
    name: 'Date added',
    _sort: 'lastDetectedAt:desc',
    icon: 'ArrowDownIcon'
  }
])

watch(selectedSort, (value) => {
  // On page load
  if (value._sort) {
    options.value = [
      options.value.find(option => option._sort === value._sort),
      ...options.value.filter(option => option._sort !== value._sort)
    ]
  }
}, { immediate: true })

onMounted(() => {
  revealAnimation()
})

function revealAnimation () {
  timeline([
    [wrapperRef.value, { height: `${optionHeight + 2 * borderWidth}px`, opacity: 0, scale: 0.9 }, { duration: 0 }],
    [wrapperRef.value, { opacity: 1, scale: 1 }, { duration: 0.45 }]
  ])
}

function selectSorting (sort) {
  if (sort._sort === selectedSort.value._sort) {
    if (!isOpened.value) {
      openDropdown()
    } else {
      closeDropdown()
    }
  } else {
    setSort({ _sort: sort._sort })
    closeDropdown()
  }
}

function clickOutsideHandler () {
  // closeDropdown()
  if (isOpened.value) { closeDropdown() }
}

function openDropdown () {
  isOpened.value = true
  animate(wrapperRef.value, { height: `${2 * optionHeight + 2 * borderWidth}px` }, { duration: 0.25 })
}

function closeDropdown () {
  isOpened.value = false
  animate(wrapperRef.value, { height: `${optionHeight + 2 * borderWidth}px` }, { duration: 0.15 })
}

</script>
