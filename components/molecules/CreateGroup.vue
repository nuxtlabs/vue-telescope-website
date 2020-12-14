<template>
  <div>
    <button
      v-if="!creatingGroup"
      class="group w-full flex items-center py-1 pl-6"
      @click="initGroupCreation"
    >
      <PlusIcon class="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
      <span class="opacity-25 group-hover:opacity-100"> Create Group </span>
    </button>

    <div class="mr-6 ml-5">
      <AppAutosizeTextarea
        v-if="creatingGroup"
        ref="create-group-tour"
        v-model="newGroupName"
        v-click-outside="() => (creatingGroup = false)"
        class="py-1 px-2"
        @submit="createGroup"
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
    collection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newGroupName: '',
      creatingGroup: false
    }
  },
  methods: {
    clearActions() {
      this.newGroupName = ''
      this.$emit('cleanup')
    },
    initGroupCreation() {
      this.$store.commit('collections/setSelectedCollection', this.collection)
      this.creatingGroup = true
      this.$nextTick(() => {
        this.$refs['create-group-tour'].$el.focus()
      })
    },
    async createGroup() {
      try {
        if (!this.newGroupName) return
        await this.$store.dispatch('collections/createGroup', {
          name: this.newGroupName,
          collection: this.collection
        })
        // this.$parent.$emit('group-selected', newGroup)
        this.clearActions()
        this.creatingGroup = false
      } catch (e) {}
    }
  }
}
</script>
