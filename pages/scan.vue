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
            <div class="relative rounded-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center justify-center pl-6 pointer-cursor"
              >
                <span class="text-gray-500 text-sm leading-5">https://</span>
              </div>
              <input
                id="domain"
                v-model="$v.url.$model"
                type="text"
                class="form-input block w-full pl-18 rounded-full text-sm leading-8 border-2 border-green-400 focus:shadow-outline-green focus:border-green-400"
                placeholder="vuejs.org"
              />
              <button
                :disabled="pending"
                type="submit"
                class="absolute inset-y-0 right-0 flex items-center justify-center my-1 mr-1 px-4 rounded-full bg-nuxt-lightgreen text-white font-semibold cursor-pointer"
              >
                submit
              </button>
            </div>
            <div v-if="inputError" class="pl-6 text-sm text-red-600 mt-1">
              {{ inputError }}
            </div>
          </form>
          <drawer v-if="openedDrawer" @close="closeDrawer">
            <loader v-if="pending"></loader>
            <dataResult v-if="result" :data="result"></dataResult>
            <error v-if="errorCode" :code="errorCode"></error>
          </drawer>
        </div>
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
    },
    closeDrawer() {
      this.openedDrawer = false
      this.url = ''
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
