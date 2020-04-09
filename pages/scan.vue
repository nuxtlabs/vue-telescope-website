<template>
  <div>
    <form @submit.prevent="analyze">
      <div>
        <label
          for="domain"
          class="block text-sm font-medium leading-5 text-gray-700"
          >Enter a domain</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <div
            class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"
          >
            <span class="text-gray-500 sm:text-sm sm:leading-5">https://</span>
          </div>
          <input
            id="domain"
            v-model="url"
            type="text"
            class="form-input block w-full pl-16 sm:pl-14 sm:text-sm sm:leading-5"
            placeholder="www.example.com"
          />
          <button
            :disabled="pending"
            type="submit"
            class="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
          >
            <span class="text-gray-500 sm:text-sm sm:leading-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#4A5568"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
    <div v-if="result" class="p-4 bg-gray-100">
      <pre v-if="result">{{ result }}</pre>
      <img :src="result.screenshot" class="h-64 border rounded" />
    </div>
    <div v-if="error" class="text-red-700">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'nuxtjs.org',
      pending: false,
      result: null,
      error: null
    }
  },
  methods: {
    async analyze() {
      if (this.pending) {
        return
      }
      this.pending = true
      this.error = null
      this.result = null
      try {
        this.result = await this.$http.$get(
          `api/analyze?url=https://${this.url}`
        )
      } catch (err) {
        if (err.response) {
          const { message } = await err.response.json()
          this.error = message
        } else {
          this.error = 'Unkown error'
        }
      }
      this.pending = false
    }
  }
}
</script>

<style></style>
