<template>
  <div class="h-screen flex flex-col">
    <TheHeader />
    <main class="pt-16 flex-1">
      <nuxt keep-alive :keep-alive-props="{ exclude: ['ExploreP'] }" />
    </main>
    <TheFooter />
    <!-- <FeedbackButton /> -->
    <PrivacyAwareModal v-if="showPrivacyAwareModal" />
    <PortalTarget name="tour" />
    <PortalTarget name="default-layout" />
    <div class="fixed bottom-0 left-0 bg-white p-2">
      {{ sortedCollections }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapState({
      showPrivacyAwareModal: (state) => state.showPrivacyAwareModal,
      collections: (state) => state.collections.collections
    }),
    ...mapGetters({ sortedCollections: 'collections/sortedCollections' })
  }
}
</script>
