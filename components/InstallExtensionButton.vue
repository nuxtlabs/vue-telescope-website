<template>
  <AppButton
    ref="el"
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

  <!-- <div ref="el">
    {{ buttonText }}
  </div> -->
</template>

<script setup lang="ts">
import { defineProps, defineExpose, ref, computed } from '#imports'

const el = ref(null)

defineExpose({
  el: el
})

defineProps({
  size: {
    type: String,
    default: 'base'
  }
})

const { isMobile, isChrome, isFirefox } = useUserAgent()
const { isExtensionInstalled } = useExtensionInstalled()

// TODO: hydration error
const buttonText = computed(() => {
  if (isChrome.value) {
    return 'Add to Chrome'
  } else if (isFirefox.value) {
    return 'Add to Firefox'
  } else {
    return 'Install Extension'
  }
})

const linkToExtention = computed(() => {
  if (isChrome.value) {
    return 'https://chrome.google.com/webstore/detail/vue-telemetry/neaebjphlfplgdhedjdhcnpjkndddbpd'
  } else if (isFirefox.value) {
    return 'https://addons.mozilla.org/en-GB/firefox/addon/vue-telemetry/'
  } else {
    return '/extensions'
  }
})

async function processLinkNavigation(e) {
  e.preventDefault()
  // TODO
  // const aware = await this.$store.dispatch(
  //   'PROCESS_PRIVACY_AWARENESS',
  //   this.linkNavigation
  // )
  // if (!aware) {
  //   return
  // }
  linkNavigation()
}
function linkNavigation() {
  window.open(linkToExtention.value, '_blank').focus()
  trackGoal()
}
// TODO
function trackGoal() {
  window.fathom && window.fathom.trackGoal('13CDY7TC', 0)
}
</script>
