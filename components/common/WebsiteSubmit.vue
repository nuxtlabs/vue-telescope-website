<template>
  <div>
    <form @submit.prevent="analyze">
      <div class="relative rounded-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center justify-center pl-6 pointer-cursor"
        >
          <span class="text-gray-500 text-sm leading-5">https://</span>
        </div>
        <input
          id="domain"
          v-model="url"
          type="text"
          class="form-input block w-full pl-18 rounded-full text-sm leading-8 border-2 border-green-400 focus:shadow-outline-green focus:border-green-400"
          placeholder="vuejs.org"
          required
        />
        <button
          :disabled="pending"
          type="submit"
          class="absolute inset-y-0 right-0 flex items-center justify-center my-1 mr-1 px-4 rounded-full bg-emerald text-white font-semibold cursor-pointer"
        >
          submit
        </button>
      </div>
      <div v-if="inputError" class="text-sm text-red-600 mt-1">
        {{ inputError }}
      </div>
      <p class="text-sm italic text-cool-gray-700 mt-4 mb-4">
        At the moment we only scan the root path of a domain.<br />
        <span class="text-cool-gray-600"
          >e.g. vuejs.org/guide will become vuejs.org/</span
        >
      </p>
    </form>
    <Drawer v-if="openedDrawer" @close="closeDrawer">
      <DrawerLoader v-if="pending" />
      <DrawerData v-if="result" :data="result" />
      <DrawerError v-if="errorCode" :code="errorCode" />
    </Drawer>
  </div>
</template>

<script>
const urlRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}?\/?.*$/
const mustBeValidUrl = (url) => urlRegex.test(url)

export default {
  components: {
    //
  },
  mixins: [],
  data() {
    return {
      openedDrawer: false,
      url: '',
      pending: false,
      result: null,
      inputError: '',
      error: null,
      errorCode: null
    }
  },
  watch: {
    url(str) {
      const pattern = /http(s)?:\/\/[A-Za-z0-9]/
      if (pattern.test(str)) {
        this.url = str.replace(/http(s)?:\/\//, '')
      }
      if (str === '') {
        this.inputError = ''
      }
    }
  },
  methods: {
    async analyze() {
      if (!this.url || !mustBeValidUrl(this.url)) {
        this.inputError = 'Please enter a valid domain, e.g. vuejs.org'
        return
      }
      if (this.pending) {
        return
      }
      this.inputError = ''
      // open drawer
      this.openedDrawer = true
      this.pending = true
      this.error = null
      this.result = null
      try {
        this.result = await this.$http.$get(
          `api/analyze?url=https://${this.url}`
        )
        this.$router.replace(`/submit?preview=${this.result.slug}`)
      } catch (err) {
        if (err.response) {
          try {
            const { message, errorCode } = await err.response.json()
            this.error = message
            this.errorCode = errorCode || 500
          } catch (err) {
            this.error = 'Could not parse API response'
            this.errorCode = 500
          }
        } else {
          this.error = 'Unkown error'
          this.errorCode = 500
        }
      }
      this.pending = false
    },
    closeDrawer() {
      this.$route.query.preview && this.$router.replace('/submit')
      this.openedDrawer = false
      // this.url = ''
      this.pending = false
      this.result = null
      this.inputError = ''
      this.error = null
      this.errorCode = null
    }
  }
}
</script>

<style></style>
