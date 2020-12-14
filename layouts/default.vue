<template>
  <div class="h-screen flex flex-col">
    <TheHeader />
    <main class="pt-16 flex-1">
      <nuxt keep-alive :keep-alive-props="{ exclude: ['ExplorePage'] }" />
    </main>
    <TheFooter />
    <!-- <FeedbackButton /> -->
    <PrivacyAwareModal v-if="showPrivacyAwareModal" />
    <PortalTarget name="tour" />
    <PortalTarget name="default-layout" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      showPrivacyAwareModal: (state) => state.showPrivacyAwareModal
    })
  }
}
</script>
