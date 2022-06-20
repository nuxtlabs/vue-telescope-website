<template>
  <AsideContentTemplate>
    <template #aside-content-aside>
      <ShowcasesSearchFilters
        ref="filtersEl"
        class="h-full overflow-x-hidden overflow-y-auto"
        @click.native="filtersTouched = true"
      />
      <!-- <div>{{ selectedSort }}</div> -->
      <div>currentPage: {{ currentPage }}</div>
      <div>showcases: {{ filterQueryString }}</div>
      <div>hasMoreShowcases {{ hasMoreShowcases }}</div>
      <div>showcases.length {{ showcases.length }}</div>
      <!-- <div>totalCount: {{ totalCount }}</div> -->
    </template>

    <template #aside-content-header>
      <ShowcasesSorting class="mr-12 -mt-9 md:-mt-8 md:mr-6" />
      <ShowcasesSelectedFilters
        :selected-filters="selectedFilters"
        :total-count="totalCount"
      />
    </template>

    <template #aside-content-main>
      <!-- <div v-for="{ domain } in showcases">{{ domain }}</div> -->
      <div class="flex flex-wrap">
        <ShowcasesListing
          :showcases="showcases"
          :showcases-per-page="showcasesPerPage"
        />
        <div class="flex items-center justify-center w-full px-8">
          <LoadMoreShowcasesButton
            v-if="hasMoreShowcases && showcases.length"
            :pending="showcasesPending"
            @update="currentPage++"
          />
        </div>
      </div>
    </template>
  </AsideContentTemplate>
</template>

<script setup lang="ts">
import AsideContentTemplate from '../templates/AsideContentTemplate.vue'
import qs from 'qs'

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

function filterFilters(raw) {
  return Object.keys(raw)
    .filter((key) => allowedFilters.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

function filterSort(raw) {
  return Object.keys(raw)
    .filter((key) => key === '_sort')
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

function setShowcases() {
  showcases.value = [...showcases.value, ...showcasesData.value]

  // if (
  //   showcasesData.value.length < showcasesPerPage ||
  //   (showcases.value.length >= maxShowCount && !user.value)
  // ) {
  //   hasMoreShowcases.value = false
  // }
}

function updateListing() {
  window.scrollTo(0, 0)
  router.push({
    query: {
      ...selectedFilters.value,
      ...selectedSort.value
    }
  })
  currentPage.value = 0
  // hasMoreShowcases.value = true
  setTimeout(() => {
    showcases.value = []
    // TODO: count
    showcasesRefresh()
  })
}

const route = useRoute()
const router = useRouter()
const { frameworks, modules, plugins, uis } = await useTechnologies()
const { selectedFilters, setFilters } = useFilters()
const { selectedSort } = useSort()

const showcases = ref([])
// const totalCount = ref(0)
const currentPage = ref(0)
const showcasesPerPage = 24
const maxShowCount = 96
// const hasMoreShowcases = ref(true)
const filtersTouched = ref(false)

// const showcases = computed(() => {
//   return showcases.value
//     ? [...showcases.value, ...showcasesData.value]
//     : [...showcasesData.value]
// })

const totalCount = computed(() => {
  return totalCountData.value
})

const hasMoreShowcases = computed(() => {
  if (
    showcasesData.value.length < showcasesPerPage ||
    (showcases.value.length >= maxShowCount && !user.value)
  ) {
    return false
  } else {
    return true
  }
})

// console.log('frameworks', frameworks)
// console.log('modules', modules)
// console.log('plugins', plugins)
// console.log('uis', uis)

const filterQueryString = computed(() => {
  return qs.stringify(
    {
      ...selectedFilters.value,
      _limit: showcasesPerPage,
      _start: currentPage.value * showcasesPerPage,
      ...selectedSort.value
    },
    {
      arrayFormat: 'repeat',
      addQueryPrefix: true
    }
  )
})

const { find } = useStrapi4()
const user = useStrapiUser()

// showcases.value = await find(`showcases${filterQueryString.value}`)

const {
  data: showcasesData,
  pending: showcasesPending,
  error,
  refresh: showcasesRefresh
} = await useAsyncData(`showcases${filterQueryString.value}`, () =>
  find(`showcases${filterQueryString.value}`)
)

const {
  data: totalCountData,
  pending: totalCountPending,
  error: totalCountError,
  refresh: totalCountRefresh
} = await useAsyncData(`showcases/count${filterQueryString.value}`, () =>
  find(`showcases/count${filterQueryString.value}`)
)

// const totalCount = await this.$strapi.find(
//         `showcases/count${this.filterQueryString}`
//       )
// totalCount.value = totalCountData.value

setShowcases()

watch(showcasesData, () => {
  console.log('watch showcasesData')
  setShowcases()
})

onMounted(() => {
  // watch(filterQueryString, () => {
  //   console.log('filterQueryString')
  //   showcasesRefresh()
  // })

  watch(currentPage, () => {
    console.log('watch currentPage')
    showcasesRefresh()
  })

  watch(
    selectedFilters,
    () => {
      console.log('watch selectedFilters')
      updateListing()
      totalCountRefresh()
    },
    { deep: true }
  )

  watch(selectedSort, () => {
    updateListing()
  })
})

onServerPrefetch(() => {
  setFilters(filterFilters(route.query))
  // this.$store.commit('setSort', filterSort(this.$route.query))
})
</script>
