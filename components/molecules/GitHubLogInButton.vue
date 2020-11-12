<template>
  <AppButton
    tag="a"
    size="base"
    appearance="github"
    class="cursor-pointer"
    @click.native="login"
  >
    <GithubIcon class="h-5 w-5 mr-2" />Login with GitHub
  </AppButton>
</template>

<script>
import GithubIcon from '@/assets/icons/github.svg?inline'

export default {
  components: {
    GithubIcon
  },
  methods: {
    login() {
      this.$strapi.$cookies.set('redirect', this.$route.fullPath)
      window.location = `${this.$config.strapiURL}/connect/github`
    }
  }
}
</script>
