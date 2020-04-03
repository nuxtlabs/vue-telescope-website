<template>
  <div>
    <form @submit.prevent="analyze">
      <input
        v-model="url"
        type="text"
        class="border"
        placeholder="Enter a domain"
      />
      <button type="submit" class="bg-green-200 px-4" :disabled="pending">
        {{ pending ? 'Scanning...' : 'scan' }}
      </button>
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
      url: 'https://nuxtjs.org',
      pending: false,
      result: null,
      error: null,
    }
  },
  methods: {
    async analyze() {
      if (this.pending) return
      this.pending = true
      this.error = null
      this.result = null
      try {
        this.result = await this.$http.$get(`api/analyze?url=${this.url}`)
      } catch (err) {
        if (err.response) {
          const { message } = await err.response.json()
          this.error = message
        } else {
          this.error = 'Unkown error'
        }
      }
      this.pending = false
    },
  },
}
</script>

<style></style>
