<template>
  <AsideContentTemplate>
    <template #aside-content-aside>
      <div>{{ selectedSort }}</div>
      <div>currentPage: {{ currentPage }}</div>
      <div>showcases: {{ showcases.length }}</div>
      <div>totalCount: {{ totalCount }}</div>
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

  if (
    showcases.value.length < showcasesPerPage ||
    (showcases.value.length >= maxShowCount && !user.value)
  ) {
    hasMoreShowcases.value = false
  }
}

const route = useRoute()
const { frameworks, modules, plugins, uis } = await useTechnologies()
const { selectedFilters, setFilters } = useFilters()
const { selectedSort } = useSort()

const showcases = ref([])
const totalCount = ref(0)
const currentPage = ref(0)
const showcasesPerPage = 24
const maxShowCount = 96
const hasMoreShowcases = ref(true)

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
totalCount.value = totalCountData.value

setShowcases()

watch(filterQueryString, () => {
  console.log('filterQueryString')
  showcasesRefresh()
})

watch(showcasesData, () => {
  console.log('showcasesData')
  setShowcases()
})

onServerPrefetch(() => {
  setFilters(filterFilters(route.query))
  // this.$store.commit('setSort', filterSort(this.$route.query))
})
</script>
