<template>
  <nav class="bg-transparent">
    <div class="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            :class="$route.name === 'index' ? 'text-white' : 'text-nuxt-gray'"
            class="inline-flex items-center justify-center p-2 rounded-md hover:text-nuxt-lightgreen hover:bg-green-50 focus:outline-none focus:bg-green-50 focus:text-nuxt-lightgreen transition duration-150 ease-in-out"
            @click="open = !open"
          >
            <HamburgerClosedIcon v-if="!open" class="h-6 w-6" />
            <HamburgerOpenedIcon v-else class="h-6 w-6" />
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between"
        >
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink
              to="/"
              class="text-base uppercase font-black tracking-tighter"
            >
              <span class="text-nuxt-lightgreen">vue</span>
              <span class="text-nuxt-gray">telemetry</span>
            </NuxtLink>
          </div>
          <div :class="{ hidden: !open }" class="hidden sm:block sm:ml-6">
            <div class="flex items-center">
              <NuxtLink
                v-for="(link, id) in links"
                :key="id"
                :to="link.to"
                active-class="text-nuxt-lightgreen"
                :class="
                  $route.name === 'index'
                    ? 'text-white hover:text-nuxt-gray'
                    : 'text-nuxt-gray hover:text-nuxt-lightgreen'
                "
                class="ml-4 px-3 py-2 rounded-md text-base font-medium tracking-wide leading-5 focus:outline-none focus:text-nuxt-lightgreen transition duration-150 ease-in-out"
              >
                {{ link.label }}
              </NuxtLink>
              <NuxtLink
                to="/submit"
                :class="
                  $route.name === 'index'
                    ? 'bg-white text-nuxt-lightgreen'
                    : 'text-white bg-nuxt-lightgreen'
                "
                class="ml-8 inline-flex items-center px-3 py-2 border border-transparent text-base font-semibold rounded shadow hover:shadow-lg focus:outline-none focus:border-nuxt focus:shadow-outline-green transition ease-in-out duration-150"
              >
                Submit
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ hidden: !open }" class="block sm:hidden">
      <div class="px-2 pt-2 pb-3">
        <NuxtLink
          v-for="(link, id) in links"
          :key="id"
          :to="link.to"
          active-class="text-nuxt-lightgreen bg-green-50"
          :class="
            $route.name === 'index'
              ? 'text-nuxt-gray hover:bg-nuxt-lightgreen hover:text-white'
              : 'text-nuxt-gray hover:text-nuxt-lightgreen hover:bg-green-50'
          "
          class="block px-3 py-2 rounded-md text-base tracking-wide focus:outline-none focus:text-nuxt-lightgreen focus:bg-green-50 transition duration-150 ease-in-out"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/submit"
          :class="
            $route.name === 'index'
              ? 'text-nuxt-gray hover:bg-nuxt-lightgreen hover:text-white'
              : 'text-nuxt-gray hover:text-nuxt-lightgreen hover:bg-green-50'
          "
          class="block px-3 py-2 rounded-md text-base tracking-wide focus:outline-none focus:text-nuxt-lightgreen focus:bg-green-50 transition duration-150 ease-in-out"
        >
          Submit
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
import HamburgerClosedIcon from '~/assets/icons/hamburger-closed.svg?inline'
import HamburgerOpenedIcon from '~/assets/icons/hamburger-opened.svg?inline'

export default {
  components: {
    HamburgerClosedIcon,
    HamburgerOpenedIcon
  },
  data() {
    return {
      open: false,
      links: [
        { to: '/explore', label: 'Explore' },
        { to: '/download', label: 'Download' }
      ]
    }
  }
}
</script>

<style></style>
