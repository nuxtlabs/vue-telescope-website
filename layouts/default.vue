<template>
  <div class="h-screen flex flex-col">
    <TheHeader />
    <main class="pt-16 flex-1">
      <nuxt />
    </main>
    <TheFooter />
    <!-- <FeedbackButton /> -->
    <PrivacyAwareModal v-if="showPrivacyAwareModal" />
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
