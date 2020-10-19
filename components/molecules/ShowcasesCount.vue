<template>
  <span>{{ totalShowcases || showcasesCount }}</span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      totalShowcases: 0
    }
  },
  computed: {
    ...mapState({
      showcasesCount: (state) => state.showcasesCount
    })
  },
  mounted() {
    window.onNuxtReady(() => this.$store.dispatch('GET_SHOWCASES_COUNT'))
  }
}
</script>
