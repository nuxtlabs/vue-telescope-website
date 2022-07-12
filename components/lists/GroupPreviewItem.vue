<template>
  <div class="mb-4">
    <div class="text-xl bg-red text-white">GroupPreviewItem</div>
    <div>{{ group.name }}</div>
    <div>Showcases count: {{ group.showcases.length }}</div>
    <button @click="deleteGroupMethod">delete group</button>
  </div>
</template>

<script>
export default {
  setup() {
    const { deleteGroup } = useLists()
    return { deleteGroup }
  },
  props: {
    group: {
      type: Object,
      default: null
    },
    collection: {
      type: Object,
      default: null
    }
  },
  methods: {
    async deleteGroupMethod() {
      await this.deleteGroup({
        group: this.group,
        collection: this.collection
      })
      // await this.$store.dispatch('collections/deleteGroup', {
      //   group: this.group,
      //   collection: this.collection
      // })
    }
  }
}
</script>
