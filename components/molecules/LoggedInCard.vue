<template>
  <div class="flex justify-between bg-grey-50 p-2 text-sm rounded-lg">
    <div class="flex flex-wrap items-center px-2">
      <a
        :href="`https://github.com/${$strapi.user.username}`"
        target="_blank"
        rel="noopener"
        class="flex items-center has-hover:hover:underline"
      >
        <img
          :src="`https://github.com/${$strapi.user.username}.png?size=24`"
          class="w-6 h-6 rounded-full mr-1"
        />
        {{ $strapi.user.username }}</a
      >
    </div>
    <AppButton
      tag="a"
      size="small"
      appearance="github"
      class="cursor-pointer"
      @click.native="logout"
    >
      Logout
    </AppButton>
  </div>
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
