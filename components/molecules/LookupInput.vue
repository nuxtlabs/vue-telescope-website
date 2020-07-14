<template>
  <div class="search-input-molecule relative flex">
    <div
      v-if="errorMessage"
      class="absolute bottom-0 left-0 text-red-500 text-sm leading-sm -mb-6"
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
    <AppInput
      ref="input"
      :size="size"
      class="rounded-r-none border-r-0"
      :class="[protocolPadding]"
      :value="url"
      @input="formatUrlInput"
      @keypress.enter.native="analyzeWebsite"
    />
    <AppButton
      :size="size"
      appearance="info"
      class="rounded-l-none"
      @click.native="analyzeWebsite"
    >
      <div v-if="!pending">
        Search
      </div>
      <AppLoader
        v-else
        class="w-6 h-6"
        background="text-blue-400"
        path="text-blue-800"
      />
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
      this.url = url.includes('://') ? url.split('://')[1] : url
      this.errorMessage = ''
    },
    async analyzeWebsite() {
      this.pending = true
      // console.log('analyzeWebsite', this.url)
      const res = await fetch(`/api/analyze?url=${this.url}`, {
        method: 'GET'
      })
        .then((response) => {
          this.pending = false
          return response.json()
        })
        .catch((err) => {
          this.pending = false
          throw new Error(err)
        })
      if (res.statusCode === 200) {
        this.$router.push({
          name: 'explore-website',
          params: {
            website: res.body.slug
          }
        })
      } else {
        this.errorMessage = res.message
      }
    }
  }
}
</script>

<style></style>
