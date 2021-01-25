<template>
  <div class="mb-4">
    <div>{{ group.name }}</div>
    <div>Showcases count: {{ group.showcases.length }}</div>
    <button @click="deleteGroup">delete group</button>
  </div>
</template>

<script>
export default {
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
    async deleteGroup() {
      await this.$store.dispatch('collections/deleteGroup', {
        group: this.group,
        collection: this.collection
      })
    }
  }
}
</script>
