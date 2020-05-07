<template>
  <div class="relative">
    <bgGradient klass="scan" />
    <div class="max-w-6xl px-8 py-40 mx-auto">
      <div class="flex">
        <div class="w-full lg:w-1/2">
          <div class="text-5xl leading-10 font-extrabold text-nuxt-lightgreen">
            Take a look.
          </div>
          <p class="text-sm text-cool-gray-700 mt-2 mb-4">
            You're seconds away to find out if a website is using Vue and its
            ecosystem
          </p>
          <form @submit.prevent="analyze">
            <div>
              <div class="mt-1 relative rounded-sm">
                <div
                  class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"
                >
                  <span class="text-gray-500 sm:text-sm sm:leading-5"
                    >https://</span
                  >
                </div>
                <input
                  id="domain"
                  v-model="$v.url.$model"
                  type="text"
                  class="form-input block w-full pl-16 sm:pl-14 sm:text-sm sm:leading-8 border-green-400 focus:shadow-outline-green focus:border-green-400"
                  placeholder="vuejs.org"
                />
                <button
                  :disabled="pending"
                  type="submit"
                  class="absolute inset-y-0 right-0 pr-2 flex items-center cursor-pointer"
                >
                  <span
                    class="stroke-current text-gray-300 sm:text-sm sm:leading-5"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
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
          <div v-if="inputError" class="text-sm text-red-600 mt-1">
            {{ inputError }}
          </div>
          <drawer v-if="openedDrawer" @close="openedDrawer = false">
            <loader v-if="pending"></loader>
            <dataResult v-if="result" :data="result"></dataResult>
            <error v-if="errorCode" :code="errorCode"></error>
          </drawer>
        </div>
        <div class="lg:w-1/2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import bgGradient from '@/components/BgGradient'
import drawer from '@/components/Drawer'
import loader from '@/components/Drawer/Loader'
import error from '@/components/Drawer/Error'
import dataResult from '@/components/Drawer/Data'

const urlRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,}?\/?.*$/
const mustBeValidUrl = (url) => urlRegex.test(url)

export default {
  components: {
    bgGradient,
    drawer,
    loader,
    error,
    dataResult
  },
  mixins: [validationMixin],
  validations: {
    url: {
      required,
      mustBeValidUrl
    }
  },
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
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.inputError = 'Enter a valid domain, e.g. vuejs.org'
      } else {
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
        } catch (err) {
          if (err.response) {
            const { message, apiErrorCode } = await err.response.json()
            this.error = message
            this.errorCode = apiErrorCode
          } else {
            this.error = 'Unkown error'
          }
        }
        this.pending = false
      }
    }
  }
}
</script>

<style></style>
