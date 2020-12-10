<template>
  <AppButton
    tag="a"
    :size="size"
    appearance="github"
    class="cursor-pointer"
    @click.native="login"
  >
    <GithubIcon class="h-4 w-4 mr-2" />Login with GitHub
  </AppButton>
</template>

<script>
import GithubIcon from '@/assets/icons/github.svg?inline'

export default {
  props: {
    size: {
      type: String,
      default: 'base'
    },
    redirect: {
      type: String,
      default: null
    }
  },
  components: {
    GithubIcon
  },
  methods: {
    login() {
      this.$strapi.$cookies.set(
        'redirect',
        this.redirect || this.$route.fullPath
      )
      window.location = `${this.$config.strapiURL}/connect/github`
    }
  }
}
</script>
