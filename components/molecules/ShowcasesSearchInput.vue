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

<script>
import { mapState } from 'vuex'
import SearchIcon from '@/assets/icons/search.svg?inline'

export default {
  components: {
    SearchIcon
  },
  data() {
    return {
      q: ''
    }
  },
  computed: {
    ...mapState({
      selectedFilters: (state) => state.selectedFilters
    }),
    computedQ: {
      get() {
        return this.selectedFilters._q
      },
      set(value) {
        this.q = value
      }
    }
  },
  methods: {
    searchQ(v) {
      this.$emit('searching')
      if (!this.q) {
        this.$store.commit('DELETE_FILTER_KEY', '_q')
      } else {
        this.$store.commit('SET_FILTER_KEY', {
          key: '_q',
          value: this.q
        })
      }
    }
  }
}
</script>

<style></style>
