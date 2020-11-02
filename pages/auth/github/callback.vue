<template>
  <div>
    <span>test</span>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'guest',
  fetchOnServer: false,
  async fetch() {
    try {
      const { jwt } = await this.$strapi.$http.$get('/auth/github/callback', {
        searchParams: {
          access_token: this.$route.query.access_token
        }
      })
      this.$strapi.setToken(jwt)
      await this.$strapi.fetchUser()
      this.$router.push(this.$strapi.$cookies.get('redirect') || '/explore')
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
