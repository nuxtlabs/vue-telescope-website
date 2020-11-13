<template>
  <AppButton
    tag="a"
    size="base"
    appearance="github"
    class="cursor-pointer"
    @click.native="logout"
  >
    Logout
  </AppButton>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$strapi.logout()
      } catch (e) {}
    }
  }
}
</script>
