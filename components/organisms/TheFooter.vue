<template>
  <div id="main-footer" class="py-6">
    <div class="max-w-container-max-width mx-auto py-4 px-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <FourLogo class="h-6" />
        </div>
        <ul class="flex items-center">
          <li class="mr-2">
            <a
              href="https://twitter.com/VueTelemetry"
              class="text-grey-900 hover:text-primary-500 transition ease-in duration-150"
              target="_blank"
              rel="noopener"
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
              rel="noopener"
            >
              <span class="sr-only">GitHub</span>
              <GithubIcon class="h-5 w-5" />
            </a>
          </li>
        </ul>
      </div>
      <div class="flex flex-col sm:flex-row items-center justify-between">
        <ul class="text-sm mb-2 sm:mb-0">
          <li class="text-grey-500">
            &copy; 2020,
            <a
              href="https://nuxtjs.org"
              target="_blank"
              rel="noopener"
              class="text-primary-500 font-medium transition ease-linear duration-150"
              >NuxtJS Team</a
            >
            for the VueJS Community
          </li>
        </ul>
        <ul class="flex items-center text-sm">
          <li class="text-grey-500">
            Hosted on
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener"
              class="text-primary-500 font-medium"
              >Netlify</a
            >
          </li>
          <span class="mx-2 text-grey-300">&bullet;</span>
          <li class="text-grey-500">
            Images served by
            <a
              href="https://cloudinary.com/"
              target="_blank"
              rel="noopener"
              class="text-primary-500 font-medium"
              >Cloudinary</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TwitterIcon from '@/assets/icons/twitter.svg?inline'
import GithubIcon from '@/assets/icons/github.svg?inline'
import FourLogo from '@/assets/logo/four.svg?inline'

export default {
  components: {
    TwitterIcon,
    GithubIcon,
    FourLogo
  }
}
</script>
