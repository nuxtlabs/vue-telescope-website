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
  }
  // mounted() {
  //   setTimeout(() => {
  //     this.totalShowcases = 10000
  //   }, 3000)
  // }
}
</script>

<style></style>
