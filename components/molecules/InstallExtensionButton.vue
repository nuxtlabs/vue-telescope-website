<template>
  <AppButton
    tag="a"
    :href="linkToExtention"
    :size="size"
    :class="[(isMobile || isExtensionInstalled) && 'hidden']"
    class="cursor-pointer"
    target="_blank"
    rel="noopener noreferrer nofollow"
    appearance="primary"
    @click.native="processLinkNavigation"
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
      browser: (state) => state.browser,
      isExtensionInstalled: (state) => state.isExtensionInstalled
    }),
    buttonText() {
      if (this.browser === 'Chrome') {
        return 'Add to Chrome'
      } else if (this.browser === 'Firefox') {
        return 'Add to Firefox'
      } else {
        return 'Install Extension'
      }
    },
    linkToExtention() {
      if (this.browser === 'Chrome') {
        return 'https://chrome.google.com/webstore/detail/vue-telescope/neaebjphlfplgdhedjdhcnpjkndddbpd'
      } else if (this.browser === 'Firefox') {
        return 'https://addons.mozilla.org/en-GB/firefox/addon/vue-telescope/'
      } else {
        return '/extensions'
      }
    }
  },
  methods: {
    async processLinkNavigation(e) {
      e.preventDefault()
      const aware = await this.$store.dispatch(
        'PROCESS_PRIVACY_AWARENESS',
        this.linkNavigation
      )
      if (!aware) {
        return
      }
      this.linkNavigation()
    },
    linkNavigation() {
      window.location.href = this.linkToExtention
      this.trackGoal()
    },
    trackGoal(e) {
      window.fathom && window.fathom.trackGoal('13CDY7TC', 0)
    }
  }
}
</script>
