<template>
  <TwitterLikeModalWrapper :fetched="true" compact @close="$emit('close')">
    <div class="space-y-6 p-8">
      <h1 class="text-seven leading-seven font-display-weight">
        {{ `Embed ${collection.name} Collection data anywhere` }}
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
        <span>Response:</span>
        <pre
          @click="selectResponse"
          tabindex="0"
          class="cursor-pointer bg-grey-200 rounded-2lg p-4 text-sm leading-sm mt-2 hover:bg-grey-50 focus:outline-none focus:border-grey-300 border-2 border-transparent transition-colors duration-200"
        ><code ref="response-data">{{ JSON.stringify(collection, undefined, 2).trim() }}</code></pre>
      </div>
    </div>
  </TwitterLikeModalWrapper>
</template>

<script>
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
    selectResponse() {
      const el = this.$refs['response-data']
      this.selectText(el)
    },
    selectText(el) {
      const range = document.createRange()
      range.selectNode(el)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
    }
  }
}
</script>
