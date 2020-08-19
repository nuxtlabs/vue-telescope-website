<template>
  <div id="main-footer" class="py-6 pb-2 text-grey-900 bg-grey-50">
    <div class="max-w-container-max-width mx-auto py-4 px-4">
      <div class="flex justify-between mb-8">
        <ul class="flex flex-col text-sm leading-sm">
          <li class="text-grey-900">
            Hosted on
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium hover:underline"
            >
              Netlify
            </a>
          </li>
          <li class="text-grey-900">
            Images served by
            <a
              href="https://cloudinary.com/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium hover:underline"
            >
              Cloudinary
            </a>
          </li>
          <li class="text-grey-900">
            Illustrations from
            <a
              href="https://icons8.com/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium hover:underline"
            >
              Icons8
            </a>
          </li>
        </ul>

        <ul
          class="text-right flex flex-col md:flex-row text-sm leading-sm mb-2"
        >
          <li class="md:mr-4">
            <NuxtLink
              to="/terms"
              class="text-primary-500 font-medium hover:underline"
            >
              Terms
            </NuxtLink>
          </li>
          <li class="">
            <NuxtLink
              to="/privacy"
              class="text-primary-500 font-medium hover:underline"
            >
              Privacy
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <NuxtLink to="/" class="mb-2 md:mb-0 md:mr-1">
            <TheSquareLogo class="h-6" />
          </NuxtLink>
          <div
            class="leading-none text-sm text-grey-900 leading-sm text-center"
          >
            &copy; 2020
            <a
              href="https://nuxtjs.org"
              target="_blank"
              rel="noopener"
              class="text-primary-500 font-medium transition ease-linear duration-150 hover:underline"
              >NuxtJS Team</a
            >
            for the VueJS Community
          </div>
        </div>
        <ul class="flex items-center">
          <li class="mr-2">
            <a
              href="https://twitter.com/VueTelemetry"
              class="text-grey-900 hover:text-primary-500 transition ease-in duration-150"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <span class="sr-only">Twitter</span>
              <TwitterIcon class="h-5 w-5" />
            </a>
          </li>
          <li class="">
            <a
              href="https://github.com/nuxt-company/vue-telemetry-analyzer"
              class="text-grey-900 hover:text-primary-500 transition ease-in duration-150"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <span class="sr-only">GitHub</span>
              <GithubIcon class="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TwitterIcon from '@/assets/icons/twitter.svg?inline'
import GithubIcon from '@/assets/icons/github.svg?inline'
import TheSquareLogo from '@/assets/logo/square-logo.svg?inline'

export default {
  components: {
    TwitterIcon,
    GithubIcon,
    TheSquareLogo
  }
}
</script>
