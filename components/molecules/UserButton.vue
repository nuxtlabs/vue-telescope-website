<template>
  <button
    class="rounded-full overflow-hidden focus:outline-none"
    ref="user-button"
  >
    <Portal to="tour">
      <UserButtonTour v-if="showTour" @close="showLocal = false" />
    </Portal>

    <svg
      class="w-8 h-8"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" fill="#F0F0F0" />
      <rect x="2" y="7" width="4" height="4" fill="#C4C4C4" />
      <rect x="4" y="3" width="4" height="4" fill="#C4C4C4" />
      <rect x="8" y="1" width="4" height="4" fill="#C4C4C4" />
      <rect x="18" y="7" width="4" height="4" fill="#C4C4C4" />
      <rect x="12" y="1" width="4" height="4" fill="#C4C4C4" />
      <rect x="16" y="3" width="4" height="4" fill="#C4C4C4" />
      <rect x="15" y="11" width="4" height="4" fill="#C4C4C4" />
      <rect x="11" y="13" width="4" height="4" fill="#C4C4C4" />
      <rect x="10" y="19" width="4" height="4" fill="#C4C4C4" />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'UserButton',
  data() {
    return {
      showLocal: true
    }
  },
  computed: {
    showTour() {
      return (
        !this.$strapi.user &&
        this.showLocal &&
        !this.$tour['collections-feature']
      )
    }
  }
}
</script>

<style></style>
