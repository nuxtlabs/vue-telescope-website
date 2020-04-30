<template>
  <nav class="bg-transparent">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            :class="$route.name === 'index' ? 'text-white' : 'text-nuxt-gray'"
            class="inline-flex items-center justify-center p-2 rounded-md hover:text-nuxt-lightgreen hover:bg-green-50 focus:outline-none focus:bg-green-50 focus:text-nuxt-lightgreen transition duration-150 ease-in-out"
            @click="open = !open"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                :class="{ hidden: open, 'inline-flex': !open }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                :class="{ hidden: !open, 'inline-flex': open }"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between"
        >
          <div class="flex-shrink-0 flex items-center">
            <nuxt-link to="/" class="font-bold cursor-pointer">
              <span
                :class="
                  $route.name === 'index'
                    ? 'text-white'
                    : 'text-nuxt-lightgreen'
                "
                >VUE</span
              >
              <span
                :class="
                  $route.name === 'index' ? 'text-white' : 'text-nuxt-gray'
                "
                >TELEMETRY</span
              >
            </nuxt-link>
          </div>
          <div :class="{ hidden: !open }" class="hidden sm:block sm:ml-6">
            <div class="flex">
              <nuxt-link
                v-for="(link, id) in links"
                :key="id"
                :to="link.to"
                active-class="text-nuxt-lightgreen bg-green-50"
                :class="
                  $route.name === 'index'
                    ? 'text-white hover:bg-nuxt-lightgreen'
                    : 'text-nuxt-gray hover:text-nuxt-lightgreen hover:bg-green-50'
                "
                class="ml-4 px-3 py-2 rounded-md text-base font-medium tracking-wide leading-5 focus:outline-none focus:text-nuxt-lightgreen focus:bg-green-50 transition duration-150 ease-in-out"
                >{{ link.label }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="{ hidden: !open }" class="block sm:hidden">
      <div class="px-2 pt-2 pb-3">
        <nuxt-link
          v-for="(link, id) in links"
          :key="id"
          :to="link.to"
          active-class="text-nuxt-lightgreen bg-green-50"
          :class="
            $route.name === 'index'
              ? 'text-white hover:bg-green-500'
              : 'text-nuxt-gray hover:text-nuxt-lightgreen hover:bg-green-50'
          "
          class="block px-3 py-2 rounded-md text-base tracking-wide focus:outline-none focus:text-nuxt-lightgreen focus:bg-green-50 transition duration-150 ease-in-out"
          >{{ link.label }}</nuxt-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      open: false,
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
