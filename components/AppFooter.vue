<template>
  <div id="main-footer" class="py-6 pb-2 text-grey-900">
    <div class="max-w-container mx-auto py-4 px-4">
      <div class="flex flex-col md:flex-row justify-between mb-4">
        <ul
          class="flex flex-col items-center md:items-start text-sm text-center leading-sm mb-4 md:mb-0"
        >
          <li class="text-grey-900">
            Frontend hosted on
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium has-hover:hover:underline"
            >
              Vercel</a>, API made with
            <a
              href="https://strapi.io"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium has-hover:hover:underline"
            >
              Strapi</a>.
          </li>
          <li class="text-grey-900">
            Images served by
            <a
              href="https://cloudinary.com/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium has-hover:hover:underline"
            >
              Cloudinary
            </a>
            with illustrations from
            <a
              href="https://icons8.com/"
              target="_blank"
              rel="noopener nofollow noreferrer"
              class="text-primary-500 font-medium has-hover:hover:underline"
            >Icons8</a>.
          </li>
        </ul>

        <ul
          class="text-right flex items-start md:mr-0 text-sm leading-sm mx-auto"
        >
          <li class="mr-4">
            <NuxtLink
              to="/terms"
              class="has-hover:hover:text-primary-500 font-medium"
            >
              Terms
            </NuxtLink>
          </li>
          <li class="mr-4">
            <NuxtLink
              to="/privacy"
              class="has-hover:hover:text-primary-500 font-medium"
            >
              Privacy
            </NuxtLink>
          </li>
          <ClientOnly>
            <li>
              <ChangelogLink class="has-hover:hover:text-primary-500 font-medium">
                <span>Changelog</span>
              </ChangelogLink>
            </li>
          </ClientOnly>
        </ul>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <NuxtLink to="/" class="mb-2 md:mb-0 md:mr-1" aria-label="Home Page">
            <TheSquareLogo class="h-6 w-6 text-primary-500" />
          </NuxtLink>
          <div
            class="leading-none text-sm text-grey-900 leading-sm text-center"
          >
            &copy; {{ new Date().getFullYear() }}
            <a
              href="https://nuxtlabs.com"
              target="_blank"
              rel="noopener"
              class="text-primary-500 font-medium transition ease-linear duration-150 has-hover:hover:underline"
            >NuxtLabs Team</a>
            for the VueJS Community
          </div>
        </div>
        <ul class="flex items-center">
          <li class="mr-2">
            <a
              href="https://twitter.com/VueTelescope"
              class="text-grey-900 hover:text-primary-500 transition ease-in duration-150"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <span class="sr-only">Twitter</span>
              <TwitterIcon class="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/nuxt-company/vue-telescope-analyzer"
              class="text-grey-900 has-hover:hover:text-primary-500 transition ease-in duration-150"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              <span class="sr-only">GitHub</span>
              <GithubIcon class="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TwitterIcon from '@/assets/icons/twitter.svg'
import GithubIcon from '@/assets/icons/github.svg'
import TheSquareLogo from '@/assets/logo/square-logo.svg'
</script>
