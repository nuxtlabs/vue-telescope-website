<template>
  <TwitterLikeModalWrapper :fetched="true" compact @close="$emit('close')">
    <div class="space-y-6 p-8">
      <h1 class="text-seven leading-seven font-display-weight">
        {{ `Share "${collection.name}" Collection` }}
      </h1>
      <div>
        <span>Endpoint to request:</span>
        <AppInput
          ref="request-data"
          :value="collectionUrl"
          class="mt-2 cursor-pointer"
          readonly
          @click.native="selectRequest"
        />
      </div>
      <div>
        <span>Usage:</span>
        <pre
          class="language-js cursor-pointer bg-grey-200 rounded-2lg p-4 text-sm leading-sm mt-2 focus:outline-none focus:border-grey-300 border-2 border-transparent"
        ><code>{{ `await fetch('${collectionUrl}').then(response => response.json())` }}</code></pre>
      </div>

      <p>Feel free to use Vue Telemetry data anywhere in your own app.</p>
    </div>
  </TwitterLikeModalWrapper>
</template>

<script>
import Prism from 'prismjs'

export default {
  props: {
    collection: {
      type: Object,
      default: null
    }
  },
  computed: {
    collectionUrl() {
      return `${this.$config.strapiURL}/lists/${this.collection.id}`
    }
  },
  methods: {
    selectRequest() {
      // this.$refs['request-data'].$el.select()
      const el = this.$refs['request-data'].$el
      this.selectText(el)
    },
    // selectResponse() {
    //   const el = this.$refs['response-data']
    //   this.selectText(el)
    // },
    selectText(el) {
      const range = document.createRange()
      range.selectNode(el)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  }
}
</script>
