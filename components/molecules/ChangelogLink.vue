<template>
  <NuxtLink to="/changelog" class="relative">
    <slot />
    <span
      v-if="!changelogNotified"
      class="block absolute top-0 right-0 -mr-3 animate-pulse rounded-full bg-red-500 h-2 w-2"
    ></span>
  </NuxtLink>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      changelogNotified: (state) => state.changelogNotified
    })
  },
  async mounted() {
    const data = await this.$content('changelog').fetch()
    const oldDate = localStorage.getItem('changelog_updatedAt')
    if (oldDate !== data.updatedAt) {
      localStorage.setItem('changelog_notified', false)
    }
    this.$store.commit(
      'setChangelogNotification',
      localStorage.getItem('changelog_notified') === 'true'
    )
    localStorage.setItem('changelog_updatedAt', data.updatedAt)
  }
}
</script>

<style></style>
