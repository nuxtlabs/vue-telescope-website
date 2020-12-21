<template>
  <div>
    <!-- TODO -->
    <h1
      v-if="groups.length"
      class="text-three font-bold-body-weight text-center"
    >
      WIP
    </h1>

    <GroupPreviewItem
      v-for="group in groups"
      :key="group.id"
      :group="group"
      :collection="collection"
    />
    <EmptyCollectionTour
      v-if="!groups || !groups.length"
      class="-mt-4"
      :collection="collection"
    />
    <!--  <GroupPreviewItemTour
      v-if="!groups || !groups.length"
      @create-group="createGroup"
    /> -->
  </div>
</template>

<script>
export default {
  props: {
    collection: {
      type: [Object, Array],
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
        await this.$store.dispatch('collections/createGroup', {
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
