<template>
  <AsideContentTemplate>
    <template #aside-content-aside>
      <ShowcasesSearchFilters
        ref="filtersRef"
        class="h-full pt-8 overflow-x-hidden overflow-y-auto"
        @click.native="filtersTouched = true"
      />
    </template>

    <template #aside-content-header>
      <ShowcasesMobileSearchFilters />
      <ShowcasesSorting class="mt-3 mr-12 md:mt-0 md:mr-6" />
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
          <AppButton v-else-if="!showcasesPending && showcases.length > 24 && !user" @click="login">
            Login with <GithubIcon class="w-6 h-6 mx-1" /> to see all
          </AppButton>
        </div>
      </div>
    </template>
  </AsideContentTemplate>
</template>

<script setup lang="ts">
import qs from 'qs'
import type { Ref } from 'vue'
import type { Showcase, User } from '~/types'
import AsideContentTemplate from '@/components/templates/AsideContentTemplate.vue'
import GithubIcon from '@/assets/icons/github.svg'

function setShowcases () {
  if (showcasesData.value) {
    showcases.value = [...showcases.value, ...showcasesData.value]
  }

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

const { selectedFilters } = useFilters()
const { isModal } = useModal()
const { getProviderAuthenticationUrl } = useStrapiAuth()

const { selectedSort } = useSort()

const filtersRef = ref(null)

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
    (showcasesData.value && showcasesData.value.length < showcasesPerPage) ||
    (showcases.value && showcases.value.length >= maxShowCount && !user.value)
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
const user = useStrapiUser() as Ref<User>

function clearFilter ($event) {
  filtersRef.value?.clearFilter($event)
}

function clearFilters () {
  filtersRef.value?.clearFilters()
}

function login () {
  const redirect = useCookie('redirect')
  redirect.value = redirect.value || route.fullPath

  const location = getProviderAuthenticationUrl('github')
  window.location = location as unknown as Location
}

const {
  data: showcasesData,
  pending: showcasesPending,
  refresh: showcasesRefresh
} = await useAsyncData(`showcases${filterQueryString.value}`, () => { // TODO: ts
  // do not fetch showcases if modal open
  if (isModal.value) {
    return []
  }
  return find<Showcase[]>(`showcases${filterQueryString.value}`)
}, {
  lazy: true
  // server: false
})

const {
  data: totalCountData,
  refresh: totalCountRefresh
} = await useAsyncData(`showcases/count${filterQueryString.value}`, () => { // TODO: ts
  // do not fetch showcases count if modal open
  if (isModal.value) {
    return 0
  }
  return find<number>(`showcases/count${filterQueryString.value}`)
}, {
  lazy: true
  // server: false
})

setShowcases()

watch(showcasesData, () => {
  setShowcases()
})

onMounted(() => {
  // watch(filterQueryString, () => {
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
