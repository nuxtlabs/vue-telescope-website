<template>
  <AppButton
    :size="size"
    :class="[isMobile && 'hidden']"
    appearance="primary"
    @click.native="trackGoal"
  >
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
  },
  methods: {
    trackGoal() {
      window.fathom && window.fathom.trackGoal('13CDY7TC', 0)
    }
  }
}
</script>
