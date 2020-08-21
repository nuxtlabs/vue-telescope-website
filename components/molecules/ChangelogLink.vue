<template>
  <NuxtLink
    to="/changelog"
    class="relative"
    :class="[!changelogNotified && 'text-primary-500']"
  >
    <slot />
    <div
      v-if="!changelogNotified"
      class="absolute top-0 left-0 animate-notification"
    >
      <slot />
    </div>
    <!-- <span
      v-if="!changelogNotified"
      class="block absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full -ml-2px animate-pulse rounded-full bg-primary-500 h-2 w-2"
    ></span> -->
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

<style scoped>
.animate-notification {
  animation: ping 5s cubic-bezier(0, 0, 0.2, 1) infinite 2s;
}

@keyframes ping {
  0% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
  75%,
  100% {
    transform: scale(2);
    filter: blur(10px);
    opacity: 0;
  }
}
</style>
