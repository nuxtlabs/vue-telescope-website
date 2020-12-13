<template>
  <div>
    <div>create your first collection</div>
    <button @click="addCollection">Add Collection</button>
  </div>
</template>

<script>
export default {
  methods: {
    async addCollection() {
      const newCollection = await this.$store.dispatch(
        'collections/createCollection',
        {
          name: 'wtf'
        }
      )
    }
  }
}
</script>
