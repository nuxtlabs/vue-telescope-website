<template>
  <div class="pl-6">
    <button
      v-if="!creatingGroup"
      class="focus:outline-none group w-full flex items-center py-1"
      @click="initGroupCreation"
    >
      <PlusIcon
        class="w-4 h-4 mr-2 opacity-50 has-hover:group-hover:opacity-100 transition-opacity duration-200"
      />
      <span
        class="opacity-25 has-hover:group-hover:opacity-100 transition-opacity duration-200"
      >
        Create List
      </span>
    </button>

    <div v-if="creatingGroup" class="flex">
      <div class="flex-1 mr-1 relative">
        <AppAutosizeTextarea
          ref="create-group-input"
          v-model="newGroupName"
          v-click-outside="() => (creatingGroup = false)"
          class="p-1 rounded-md"
          @submit="createGroup"
          @keydown.esc.native="clearActions"
          @click.stop.native
        />
        <button
          v-if="newGroupName"
          class="focus:outline-none absolute top-0 right-0 z-10 p-1 m-1 bg-grey-100 rounded-md"
          @click="clearInput"
        >
          <XmarkIcon class="w-4 h-4" />
        </button>
      </div>

      <div class="w-8 h-8">
        <button
          v-if="creatingGroup && newGroupName"
          title="Save"
          class="focus:outline-none border-2 border-transparent bg-grey-50 rounded-lg p-1"
          @click.stop="createGroup"
        >
          <AppLoader
            v-if="loading"
            class="w-5 h-5"
            background="text-grey-400"
            path="text-grey-200"
          />
          <SaveIcon v-else class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '@/assets/icons/plus-circle.svg?inline'
import XmarkIcon from '@/assets/icons/xmark.svg?inline'
import SaveIcon from '@/assets/icons/save.svg?inline'

export default {
  components: {
    PlusIcon,
    XmarkIcon,
    SaveIcon
  },
  props: {
    collection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
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
        this.$refs['create-group-input'].$el.focus()
      })
    },
    clearInput() {
      this.newGroupName = ''
      this.$refs['create-group-input'].$el.focus()
    },
    async createGroup() {
      try {
        if (!this.newGroupName || this.loading) return
        this.loading = true
        await this.$store.dispatch('collections/createGroup', {
          name: this.newGroupName,
          collection: this.collection
        })
        this.loading = false
        // this.$parent.$emit('group-selected', newGroup)
        this.clearActions()
        this.creatingGroup = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
