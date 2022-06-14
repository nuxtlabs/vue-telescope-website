<template>
  <AsideContentTemplate>
    <template #aside-content-aside>
      <div>{{ selectedSort }}</div>
      <div>EXXXPLORE</div>
      <div>EXXXPLORE</div>
    </template>

    <template #aside-content-main>
      <!-- <div v-for="{ domain } in showcases">{{ domain }}</div> -->
      <div class="flex flex-wrap">
        <!--
          v-observe-visibility="{
            callback: i === showcases.length - 1 ? lazyLoadShowcases : () => {},
            once: true
          }"
          -->
        <ShowcasesListing
          :showcases="showcases"
          :showcases-per-page="showcasesPerPage"
        />
        <!-- <div class="flex items-center justify-center w-full px-8">
          <LoadMoreShowcasesButton
            v-if="hasMoreShowcases && showcases.length"
            :pending="$fetchState.pending"
            @update="currentPage++"
          />
        </div> -->
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

const route = useRoute()
const { frameworks, modules, plugins, uis } = await useTechnologies()
const { selectedFilters, setFilters } = useFilters()
const { selectedSort } = useSort()

// const showcases = ref([])
const currentPage = ref(0)
const showcasesPerPage = 24

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

// showcases.value = await find(`showcases${filterQueryString.value}`)

const { data: showcases } = await useAsyncData(
  `showcases${filterQueryString.value}`,
  () => find(`showcases${filterQueryString.value}`)
)

onServerPrefetch(() => {
  setFilters(filterFilters(route.query))
  // this.$store.commit('setSort', filterSort(this.$route.query))
})
</script>
