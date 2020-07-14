<template>
  <div class="relative">
    <button
      class="absolute top-0 left-0 focus:outline-none h-10 w-10 flex items-center justify-center"
      @click="searchWebsite"
    >
      <SearchIcon class="w-6 h-6 text-grey-600" />
    </button>
    <AppInput
      v-model="hostname"
      class="pl-10"
      size="base"
      @keypress.enter.native="searchWebsite"
    />
  </div>
</template>

<script>
import SearchIcon from '@/assets/icons/search.svg?inline'

export default {
  components: {
    SearchIcon
  },
  data() {
    return {
      hostname: ''
    }
  },
  methods: {
    searchWebsite(v) {
      this.$emit('update-filters', {
        hostname: this.hostname
      })
    }
  }
}
</script>

<style></style>
