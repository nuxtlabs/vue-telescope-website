<template>
  <div class="flex ml-2">
    <button
      v-if="!creatingCollection"
      class="group w-full flex items-center py-1 px-2 mr-4 text-sm leading-base bg-primary-500 rounded-md text-white font-bold-body-weight"
      @click="initCollectionCreation"
    >
      <PlusIcon class="w-4 h-4 mr-2 opacity-100 group-hover:opacity-100" />
      <span class="uppercase opacity-100 group-hover:opacity-100">
        Create Collection
      </span>
    </button>

    <div class="w-full mr-4" v-if="creatingCollection">
      <AppAutosizeTextarea
        v-model="newCollectionName"
        v-click-outside="() => (creatingCollection = false)"
        ref="create-collection-tour"
        class="py-1 px-2"
        @submit="createCollection"
        @keydown.esc.native="clearActions"
        @click.stop.native
      />
    </div>
  </div>
</template>

<script>
import PlusIcon from '@/assets/icons/plus-circle.svg?inline'

export default {
  components: {
    PlusIcon
  },
  props: {
    // collection: {
    //   type: Object,
    //   default: null
    // }
  },
  data() {
    return {
      newCollectionName: '',
      creatingCollection: false
    }
  },
  methods: {
    clearActions() {
      this.newCollectionName = ''
      this.$emit('cleanup')
    },
    initCollectionCreation() {
      // this.$store.commit('collections/setSelectedCollection', this.collection)
      this.creatingCollection = true
      this.$nextTick(() => {
        this.$refs['create-collection-tour'].$el.focus()
      })
    },
    async createCollection() {
      try {
        if (!this.newCollectionName) return
        const newCollection = await this.$store.dispatch(
          'collections/createCollection',
          {
            name: this.newCollectionName
          }
        )
        this.clearActions()
        this.creatingCollection = false
      } catch (e) {}
    }
  }
}
</script>
