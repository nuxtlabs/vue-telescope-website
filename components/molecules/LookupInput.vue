<template>
  <div class="lookup-input-molecule relative flex">
    <div
      v-if="errorMessage"
      class="absolute bottom-0 left-0 text-orange-500 text-sm leading-sm -mb-6 ml-2 truncate font-bold-body-weight w-full"
    >
      {{ errorMessage }}
    </div>
    <span
      class="absolute top-0 left-0 h-full flex items-center pl-4 font-bold-body-weight text-grey-400"
      :class="[protocolTextSize]"
      @click="$refs.input.$el.focus()"
    >
      https://
    </span>
    <label class="">
      <span class="absolute opacity-0 pointer-events-none">Lookup</span>
      <AppInput
        ref="input"
        type="url"
        :size="size"
        class="rounded-r-none border-r-0"
        :class="[protocolPadding]"
        :value="url"
        label="Lookup"
        @input="formatUrlInput"
        @keypress.enter.native="processAnalyzeWebsite"
      />
    </label>
    <AppButton
      :size="size"
      appearance="info"
      :class="pending && 'pointer-events-none'"
      class="flex items-center justify-center rounded-l-none border-l-0"
      @click.native="processAnalyzeWebsite"
    >
      <div
        :class="[!pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
        class="transition duration-200 transform ease-in-out"
      >
        Lookup
      </div>
      <div
        :class="[pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0']"
        class="absolute transition duration-200 transform ease-in-out"
      >
        <AppLoader
          class="w-6 h-6"
          background="text-blue-400"
          path="text-blue-300"
        />
      </div>
    </AppButton>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'large'
    }
  },
  data() {
    return {
      url: '',
      errorMessage: '',
      pending: false
    }
  },
  computed: {
    protocolTextSize() {
      if (this.size === 'large') {
        return 'text-eight'
      } else if (this.size === 'small') {
        return 'text-sm'
      } else {
        return 'text-base'
      }
    },
    protocolPadding() {
      if (this.size === 'large') {
        return 'pl-20'
      } else if (this.size === 'small') {
        return 'pl-16'
      } else {
        return 'pl-18'
      }
    }
  },
  methods: {
    formatUrlInput(url) {
      if (!url) return
      this.url = url.includes('://') ? url.split('://')[1] : url
      this.errorMessage = ''
      const parsedURL = new URL('https://' + this.url)
      if (parsedURL.pathname !== '/') {
        this.errorMessage = `Only top-level domains are analyzed: ${parsedURL.origin}`
      }
    },
    async processAnalyzeWebsite() {
      const aware = await this.$store.dispatch(
        'PROCESS_PRIVACY_AWARENESS',
        this.analyzeWebsite
      )
      if (!aware) {
        return
      }
      this.analyzeWebsite()
    },
    analyzeWebsite() {
      if (typeof EventSource === 'undefined') {
        console.log('EventSource is not supported in current borwser!')
        return
      }
      this.pending = true
      const sse = new EventSource(
        `https://service.vuetelemetry.com?url=${this.url}&isPublic=true`
      )
      sse.addEventListener('message', (event) => {
        this.pending = false
        try {
          const res = JSON.parse(event.data)

          if (!res.error && !res.isAdultContent) {
            this.$store.commit('SET_MODAL', true)
            this.$router.push({
              name: 'explore-website',
              params: {
                website: res.slug
              }
            })
          } else if (!res.error && res.isAdultContent) {
            this.errorMessage = 'Website has adult content ;)'
          } else {
            this.errorMessage = res.message
          }
          sse.close()
        } catch (err) {
          this.pending = false
          sse.close()
        }
      })

      // const res = await fetch(`/api/analyze?url=${this.url}&isPublic=true`, {
      //   method: 'GET'
      // })
      //   .then((response) => {
      //     this.pending = false
      //     return response.json()
      //   })
      //   .catch((err) => {
      //     this.pending = false
      //     throw new Error(err)
      //   })
      // if (res.statusCode === 200 && !res.body.isAdultContent) {
      //   this.$store.commit('SET_MODAL', true)
      //   this.$router.push({
      //     name: 'explore-website',
      //     params: {
      //       website: res.body.slug
      //     }
      //   })
      // } else if (res.statusCode === 200 && res.body.isAdultContent) {
      //   this.errorMessage = 'Website has adult content ;)'
      // } else {
      //   this.errorMessage = res.message
      // }
    }
  }
}
</script>

<style></style>
