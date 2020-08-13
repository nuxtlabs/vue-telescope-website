<template>
  <div id="main-footer" class="py-6 pb-2 text-grey-900">
    <div class="max-w-container-max-width mx-auto py-4 px-4">
      <div class="flex flex-col justify-between items-center mb-4">
        <div class="text-sm text-grey-900 leading-sm mb-2 text-center">
          &copy; 2020,
          <a
            href="https://nuxtjs.org"
            target="_blank"
            rel="noopener"
            class="text-primary-500 font-medium transition ease-linear duration-150 hover:underline"
            >NuxtJS Team</a
          >
          for the VueJS Community
        </div>

        <ul class="flex items-center flex-row text-sm leading-sm mb-2">
          <li class="">
            <NuxtLink
              to="/terms"
              class="text-primary-500 font-medium hover:underline"
            >
              Terms
            </NuxtLink>
          </li>
          <span class="inline-block mx-2 text-grey-300">&bullet;</span>
          <li class="">
            <NuxtLink
              to="/privacy"
              class="text-primary-500 font-medium hover:underline"
            >
              Privacy
            </NuxtLink>
          </li>
        </ul>

        <ul class="flex flex-col items-center sm:flex-row text-sm leading-sm">
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
          <span class="hidden sm:inline-block mx-2 text-grey-300"
            >&bullet;</span
          >
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
          <span class="hidden sm:inline-block mx-2 text-grey-300"
            >&bullet;</span
          >
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
      </div>

      <div class="flex items-center justify-between">
        <div>
          <NuxtLink to="/">
            <FourLogo class="h-6" />
          </NuxtLink>
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
import FourLogo from '@/assets/logo/four.svg?inline'

export default {
  components: {
    TwitterIcon,
    GithubIcon,
    FourLogo
  }
}
</script>
