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
        Create Group
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
          class="focus:outline-none absolute top-0 right-0 z-10 p-1 m-1 bg-grey-100 bg-opacity-80 rounded-md"
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
import PlusIcon from '@/assets/icons/plus-circle.svg'
import XmarkIcon from '@/assets/icons/xmark.svg'
import SaveIcon from '@/assets/icons/save.svg'

export default {
  setup() {
    const { setSelectedList, createRemoteGroup } = useLists()
    return { setSelectedList, createRemoteGroup }
  },
  emits: ['cleanup'],
  components: {
    PlusIcon,
    XmarkIcon,
    SaveIcon
  },
  props: {
    list: {
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
      this.setSelectedList(this.list)
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
        await this.createRemoteGroup({
          name: this.newGroupName,
          list: this.list
        })
        this.loading = false
        this.clearActions()
        this.creatingGroup = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>
