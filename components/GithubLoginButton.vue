<template>
  <AppButton
    :size="size"
    appearance="github"
    class="cursor-pointer"
    @click.native="login"
  >
    <GithubIcon class="h-5 w-5 mr-2" />{{ text }}
  </AppButton>
</template>

<script setup lang="ts">
import GithubIcon from '@/assets/icons/github.svg'

const route = useRoute()
const { getProviderAuthenticationUrl } = useStrapiAuth()

const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  redirect: {
    type: String,
    default: null
  },
  text: {
    type: String,
    default: 'Login with GitHub'
  }
})

function login () {
  const redirect = useCookie('redirect')
  redirect.value = props.redirect || route.fullPath

  const location = getProviderAuthenticationUrl('github')
  window.location = location as unknown as Location
}
</script>
