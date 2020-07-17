<template>
  <AppButton :size="size" appearance="primary" :class="[isMobile && 'hidden']">
    {{ buttonText }}
  </AppButton>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    size: {
      type: String,
      default: 'base'
    }
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.isMobile,
      browser: (state) => state.browser
    }),
    buttonText() {
      if (this.browser === 'Chrome') {
        return 'Add to Chrome'
      } else if (this.browser === 'Firefox') {
        return 'Add to Firefox'
      } else {
        return 'Install Extension'
      }
    }
  }
}
</script>

<style></style>
