<template>
  <div class="">
    <TheHeader />
    <main class="mt-16">
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
