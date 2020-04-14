<template>
  <nav class="bg-white">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-400 hover:bg-green-50 focus:outline-none focus:bg-green-50 focus:text-green-400 transition duration-150 ease-in-out"
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
              <span class="text-green-400">VUE</span>
              <span class="text-gray-700">TELEMETRY</span>
            </nuxt-link>
          </div>
          <div :class="{ hidden: !open }" class="hidden sm:block sm:ml-6">
            <div class="flex">
              <nuxt-link
                v-for="(link, id) in links"
                :key="id"
                :to="link.to"
                active-class="text-green-400 bg-green-50"
                class="ml-4 px-3 py-2 rounded-md text-base font-medium leading-5 text-gray-700 hover:text-green-400 hover:bg-green-50 focus:outline-none focus:text-green-400 focus:bg-green-50 transition duration-150 ease-in-out"
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
          active-class="text-green-400 bg-green-50"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-400 hover:bg-green-50 focus:outline-none focus:text-green-400 focus:bg-green-50 transition duration-150 ease-in-out"
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
