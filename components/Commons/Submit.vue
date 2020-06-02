<template>
  <div class="z-0">
    <form @submit.prevent="analyze">
      <div class="relative rounded-full">
        <div class="absolute inset-y-0 left-0 flex items-center justify-center pl-6 pointer-cursor">
          <span class="text-gray-500 text-sm leading-5">https://</span>
        </div>
        <input id="domain" v-model="url" type="text" class="form-input block w-full pl-18 rounded-full text-sm leading-8 border-2 border-gray-500 outline-none focus:border-emerald" placeholder="vuejs.org" required />
        <button :disabled="pending" type="submit" class="absolute inset-y-0 right-0 flex items-center justify-center my-1 mr-1 px-4 rounded-full bg-emerald text-black font-semibold cursor-pointer" >
          <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">
            <path d="M 13.261719 14.867188 L 15.742188 17.347656 C 15.363281 18.070313 15.324219 18.789063 15.722656 19.1875 L 20.25 23.714844 C 20.820313 24.285156 22.0625 23.972656 23.015625 23.015625 C 23.972656 22.058594 24.285156 20.820313 23.714844 20.25 L 19.191406 15.722656 C 18.789063 15.324219 18.070313 15.363281 17.347656 15.738281 L 14.867188 13.261719 Z M 8.5 0 C 3.804688 0 0 3.804688 0 8.5 C 0 13.195313 3.804688 17 8.5 17 C 13.195313 17 17 13.195313 17 8.5 C 17 3.804688 13.195313 0 8.5 0 Z M 8.5 15 C 4.910156 15 2 12.089844 2 8.5 C 2 4.910156 4.910156 2 8.5 2 C 12.089844 2 15 4.910156 15 8.5 C 15 12.089844 12.089844 15 8.5 15 Z"/>
          </svg>
        </button>
      </div>
      <div v-if="inputError" class="pl-6 text-sm text-red-600 mt-1">
        {{ inputError }}
      </div>
      <p class="text-sm text-gray-500 mt-4 mb-4">
        At the moment we only scan the root path of a domain.<br />
        <span class="italic">e.g. vuejs.org/guide will become vuejs.org/</span>
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
import BgGradient from '@/components/BgGradient'
import Drawer from '@/components/Drawer/Drawer'
import DrawerLoader from '@/components/Drawer/DrawerLoader'
import DrawerError from '@/components/Drawer/DrawerError'
import DrawerData from '@/components/Drawer/DrawerData'

const urlRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}?\/?.*$/
const mustBeValidUrl = url => urlRegex.test(url)

export default {
  components: {
    BgGradient,
    Drawer,
    DrawerLoader,
    DrawerError,
    DrawerData
  },
  mixins: [],
  data () {
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
    url (str) {
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
    async analyze () {
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
    closeDrawer () {
      this.$route.query.prevuew && this.$router.replace('/submit')
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
