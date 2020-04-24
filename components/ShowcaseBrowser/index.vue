<template>
  <div class="rounded border border-gray-200 overflow-hidden shadow-xl">
    <div class="px-4 py-2 flex justify-between items-center bg-gray-100">
      <div class="hidden sm:flex">
        <span class="w-2 h-2 rounded-full bg-red-500"></span>
        <span class="mx-1 w-2 h-2 rounded-full bg-yellow-300"></span>
        <span class="w-2 h-2 rounded-full bg-green-400"></span>
      </div>
      <div class="hidden sm:flex mx-4">
        <div class="w-4 h-4 cursor-pointer mr-2" @click="navShowcase('prev')">
          <svg
            class="stroke-current text-gray-400 hover:text-gray-600 transition ease-in-out duration-150"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 19L3 12M3 12L10 5M3 12L21 12"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="w-4 h-4 cursor-pointer" @click="navShowcase()">
          <svg
            class="stroke-current text-gray-400 hover:text-gray-600 transition ease-in-out duration-150"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 5L21 12M21 12L14 19M21 12L3 12"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="flex-1 sm:mr-4">
        <div
          class="px-2 select-none flex items-center bg-white rounded border border-transparent cursor-pointer text-gray-400 hover:text-gray-600 hover:border-gray-300 transition ease-in-out duration-150"
          @click="openUrl"
        >
          <div class="flex-1">
            <p class="text-sm leading-6 truncate">{{ url }}</p>
          </div>
          <svg
            class="w-4 h-4 stroke-current text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="hidden sm:flex">
        <div class="w-4 h-4 cursor-pointer" @click="newScan">
          <svg
            class="stroke-current text-gray-400 hover:text-gray-600 transition ease-in-out duration-150"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M20 12L4 12"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="p-4 bg-cover bg-top bg-no-repeat"
      style="height: 343px;"
      :style="{ backgroundImage: 'url(' + img + ')' }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    showcases() {
      return this.$store.getters.showcases
    }
  },
  methods: {
    openUrl() {
      window.open(this.url, '_blank')
    },
    newScan() {
      this.$store.dispatch('openModal')
    },
    navShowcase(s = 'next') {
      if (!/next|prev/.test(s)) return
      const currIndex = this.showcases.findIndex(
        (showcase) => showcase.url === this.url
      )
      const newIndex = s === 'next' ? currIndex + 1 : currIndex - 1
      const showcase = this.showcases[newIndex]
      const slug = showcase ? showcase.slug : null
      if (slug) this.$router.push(`/showcases/${slug}`)
    }
  }
}
</script>

<style></style>
