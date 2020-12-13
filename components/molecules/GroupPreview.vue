<template>
  <div>
    <GroupPreviewItem
      v-for="group in groups"
      :key="group.id"
      :group="group"
      :collection="collection"
    />
    <GroupPreviewItemTour
      v-if="!groups || !groups.length"
      @create-group="createGroup"
    />
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      type: Object,
      default: null
    },
    groups: {
      type: Array,
      default: null
    }
  },
  methods: {
    async createGroup() {
      try {
        // if (!this.newName) return
        const newGroup = await this.$store.dispatch('collections/createGroup', {
          name: 'SUPER',
          collection: this.collection
        })
        // this.$parent.$emit('group-selected', newGroup)
        // this.clearActions()
      } catch (e) {}
    }
  }
}
</script>

<style></style>
