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
    <ClientOnly>{{ buttonText }}</ClientOnly>
  </AppButton>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: 'base'
  }
})

const config = useRuntimeConfig().public
const { isMobile, isChrome, isFirefox, isEdge } = useUserAgent()
const { isExtensionInstalled } = useExtensionInstalled()
const { processPrivacyAwareness } = usePrivacyAwareness()

const buttonText = computed(() => {
  if (isChrome.value) {
    return 'Add to Chrome'
  } else if (isFirefox.value) {
    return 'Add to Firefox'
  } else if (isEdge.value) {
    return 'Add to Edge'
  } else {
    return 'Install Extension'
  }
})

const linkToExtention = computed(() => {
  if (isChrome.value) {
    return config.googleStoreUrl
  } else if (isFirefox.value) {
    return config.firefoxStoreUrl
  } else if (isEdge.value) {
    return config.edgeStoreUrl
  } else {
    return '/extensions'
  }
})

async function processLinkNavigation (e) {
  e.preventDefault()
  await processPrivacyAwareness(linkNavigation)
}

function linkNavigation () {
  window.open(linkToExtention.value, '_blank').focus()
  trackGoal()
}

function trackGoal () {
  window.fathom?.trackGoal('13CDY7TC', 0)
}
</script>
