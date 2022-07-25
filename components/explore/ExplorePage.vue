<template>
  <AsideContentTemplate>
    <template #aside-content-aside>
      <ShowcasesSearchFilters
        ref="filtersEl"
        class="h-full overflow-x-hidden overflow-y-auto"
        @click.native="filtersTouched = true"
      />
    </template>

    <template #aside-content-header>
      <ShowcasesMobileSearchFilters />
      <ShowcasesSorting class="mr-12 -mt-9 md:-mt-8 md:mr-6" />
      <ShowcasesSelectedFilters
        :selected-filters="selectedFilters"
        :total-count="totalCount"
        @clear-filter="clearFilter"
        @clear-filters="clearFilters"
      />
    </template>

    <template #aside-content-main>
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
          <AppButton v-else-if="!showcasesPending" @click="login">
            Login with <GithubIcon class="h-6 w-6 mx-1" /> to see all
          </AppButton>
        </div>
      </div>
    </template>
  </AsideContentTemplate>
</template>

<script setup lang="ts">
import qs from 'qs'
import AsideContentTemplate from '@/components/templates/AsideContentTemplate.vue'
import GithubIcon from '@/assets/icons/github.svg'

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

function filterSort (raw) {
  return Object.keys(raw)
    .filter(key => key === '_sort')
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

function setShowcases () {
  showcases.value = [...showcases.value, ...showcasesData.value]

  // if (
  //   showcasesData.value.length < showcasesPerPage ||
  //   (showcases.value.length >= maxShowCount && !user.value)
  // ) {
  //   hasMoreShowcases.value = false
  // }
}

function updateListing () {
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
    showcasesRefresh()
  })
}

const route = useRoute()
const router = useRouter()

// TODO: weird stuff, if I remove next line it breaks,
// while it isn't used in this component
const { frameworks, modules, plugins, uis } = await useTechnologies()
// console.log('frameworks', frameworks)
// console.log('modules', modules)
// console.log('plugins', plugins)
// console.log('uis', uis)

const { selectedFilters, setFilters } = useFilters()
const { isModal } = useModal()
const { getProviderAuthenticationUrl } = useStrapiAuth()

const { selectedSort, setSort } = useSort()

const filtersEl = ref(null)

const showcases = ref([])
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

const { find } = useStrapi3()
const user = useStrapiUser()

function clearFilter ($event) {
  filtersEl.value && filtersEl.value.clearFilter($event)
}

function clearFilters () {
  filtersEl.value && filtersEl.value.clearFilters()
}

function login () {
  const redirect = useCookie('redirect')
  redirect.value = redirect.value || route.fullPath

  const location = getProviderAuthenticationUrl('github')
  window.location = location
}

// init filters
setFilters(filterFilters({ ...selectedFilters.value, ...route.query }))
setSort(filterSort({ ...selectedSort.value, ...route.query }))

const {
  data: showcasesData,
  pending: showcasesPending,
  error,
  refresh: showcasesRefresh
} = await useAsyncData(`showcases${filterQueryString.value}`, () => {
  // do not fetch showcases if modal open
  if (isModal.value) {
    return []
  }
  return find(`showcases${filterQueryString.value}`)
})

const {
  data: totalCountData,
  pending: totalCountPending,
  error: totalCountError,
  refresh: totalCountRefresh
} = await useAsyncData(`showcases/count${filterQueryString.value}`, () => {
  // do not fetch showcases count if modal open
  if (isModal.value) {
    return 0
  }
  return find(`showcases/count${filterQueryString.value}`)
})

// const totalCount = await this.$strapi.find(
//         `showcases/count${this.filterQueryString}`
//       )
// totalCount.value = totalCountData.value

setShowcases()

watch(showcasesData, () => {
  setShowcases()
})

onMounted(() => {
  // watch(filterQueryString, () => {
  //   console.log('filterQueryString')
  //   showcasesRefresh()
  // })

  watch(currentPage, () => {
    showcasesRefresh()
  })

  watch(
    selectedFilters,
    () => {
      updateListing()
      totalCountRefresh()
    },
    { deep: true }
  )

  watch(selectedSort, () => {
    updateListing()
  })

  watch(route, (newValue) => {
    if (newValue.name === 'explore') {
      // set query params when close showcase modal and have filters selected
      router.push({
        query: { ...selectedFilters.value, ...selectedSort.value }
      })
    }
  })

  watch(isModal, (value) => {
    // fetch showcases when modal closed
    if (!value && !showcasesData.value.length) {
      showcasesRefresh()
      totalCountRefresh()
    }
  })
})
</script>
