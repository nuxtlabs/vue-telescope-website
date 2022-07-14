<template>
  <FloatingViewModal :fetched="true" compact @close="$emit('close')">
    <div class="space-y-6 p-8">
      <h1 class="text-seven leading-seven font-display-weight">
        {{ `Share "${list.name}" List` }}
      </h1>
      <div>
        <span>Endpoint to request:</span>
        <AppInput
          ref="request-data"
          :value="listUrl"
          class="mt-2 cursor-pointer"
          readonly
          @click.native="selectRequest"
        />
      </div>
      <div>
        <span>Usage:</span>
        <pre
          class="flex overflow-auto cursor-pointer bg-grey-200 rounded-2lg p-4 text-sm leading-sm mt-2 focus:outline-none focus:border-grey-300 border-2 border-transparent"
        >
          <code>{{code}}</code>
        </pre>
      </div>

      <p>Feel free to use Vue Telescope data anywhere in your own app.</p>
    </div>
  </FloatingViewModal>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    list: {
      type: Object,
      default: null
    }
  },
  computed: {
    listUrl() {
      return `${this.$config.strapiURL}/lists/${this.list.id}`
    },
    code() {
      return `await fetch('${this.listUrl}').then(response => response.json())`
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
