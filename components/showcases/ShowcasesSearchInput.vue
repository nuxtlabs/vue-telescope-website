<template>
  <div class="relative">
    <button
      class="absolute top-0 left-0 focus:outline-none h-10 w-10 flex items-center justify-center"
      @click="searchQ"
    >
      <SearchIcon class="w-5 h-5 text-grey-400" />
    </button>
    <AppInput
      v-model="computedQ"
      class="pl-10"
      size="base"
      placeholder="Search a website"
      @keypress.enter.native="searchQ"
    />
  </div>
</template>

<script setup lang="ts">
import type { WritableComputedRef } from 'vue'
import SearchIcon from '@/assets/icons/search.svg'

const { selectedFilters, setFilterKey, deleteFilterKey } = useFilters()

const q = ref('')

const emit = defineEmits(['searching'])

const computedQ: WritableComputedRef<string> = computed({
  get () {
    return selectedFilters.value._q
  },
  set (value) {
    q.value = value
  }
})

function searchQ () {
  emit('searching')
  if (!q.value) {
    deleteFilterKey('_q')
  } else {
    setFilterKey({
      key: '_q',
      value: q.value
    })
  }
}
</script>
