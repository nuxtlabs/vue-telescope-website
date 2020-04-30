<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto py-6 px-4 sm:px-6 lg:py-8 lg:px-8">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="xl:col-span-1">
          <div class="flex-shrink-0 flex items-center">
            <nuxt-link to="/" class="font-bold cursor-pointer">
              <span class="text-nuxt-lightgreen">VUE</span>
              <span class="text-nuxt-gray">TELEMETRY</span>
            </nuxt-link>
          </div>
          <p class="mt-2 text-gray-500 text-base leading-6">
            With Vue Telemetry, reveal the Vue technologies used on any website.
          </p>
        </div>
        <div class="mt-6 grid grid-cols-3 gap-8 xl:mt-0 xl:col-span-2">
          <div>
            <h4
              class="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"
            >
              VT
            </h4>
            <ul class="mt-2">
              <li v-for="(link, i) in links" :key="i" class="mt-2">
                <nuxt-link
                  :to="link.to"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  {{ link.label }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"
            >
              VueJS
            </h4>
            <ul class="mt-2">
              <li>
                <a
                  href="https://vuejs.org/?ref=vue-telemetry"
                  target="_blank"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  Website
                </a>
              </li>
              <li class="mt-2">
                <a
                  href="#"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  Github
                </a>
              </li>
              <li class="mt-2">
                <a
                  href="#"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              class="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase"
            >
              NuxtJS
            </h4>
            <ul class="mt-2">
              <li>
                <a
                  href="https://nuxtjs.org/?ref=vue-telemetry"
                  target="_blank"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  Website
                </a>
              </li>
              <li class="mt-2">
                <a
                  href="#"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  Github
                </a>
              </li>
              <li class="mt-2">
                <a
                  href="#"
                  class="text-base leading-6 text-gray-500 hover:text-nuxt-lightgreen"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-6 border-t border-gray-200 pt-6">
        <p class="text-sm leading-4 text-gray-400 xl:text-center">
          &copy; 2020, made by NuxtJS Team for the Vue Community
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: '/showcases', label: 'Showcases' },
        { to: '/download', label: 'Download' },
        { to: '/scan', label: 'Scan' }
      ]
    }
  }
}
</script>

<style></style>
