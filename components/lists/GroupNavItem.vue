<template>
  <div
    v-click-outside="clickOutsideHandler"
    class="focus:outline-none group flex"
  >
    <span
      class="cursor-pointer flex-1 relative mr-1"
      @click="clickOnNameHandler"
      @keypress.enter="clickOnNameHandler"
    >
      <AppAutosizeTextarea
        v-if="updatingGroup"
        ref="update-group-input"
        v-model="newGroupName"
        class="p-1 rounded-md"
        @submit="updateGroup"
        @keydown.esc.native="clearActions"
        @click.stop.native
      />
      <span
        v-else
        style="word-break: break-word"
        class="p-1 inline-flex select-none"
        :class="[isSelected && 'text-primary-500']"
      >
        <span
          ref="deleting-scrim"
          class="deleting-scrim absolute top-0 left-0 w-full h-full pointer-events-none"
          style="opacity: 0"
        ></span>
        {{ group.name }}
      </span>
    </span>

    <div class="w-8 h-8 ml-auto">
      <button
        v-if="updatingGroup"
        title="Save"
        class="focus:outline-none bg-grey-50 rounded-md p-2"
        @click.stop="updateGroup"
      >
        <AppLoader
          v-if="loading"
          class="w-4 h-4"
          background="text-grey-400"
          path="text-grey-200"
        />
        <SaveIcon v-else class="w-4 h-4" />
      </button>
      <button
        v-else
        ref="anchor"
        class="focus:outline-none has-hover:group-hover:flex has-hover:hover:bg-grey-50 rounded-lg w-full h-full items-center justify-center"
        :class="[openCollapse || showPopup || isSelected ? 'flex' : 'hidden']"
        @click="openPopup"
      >
        <DotsVerticalIcon class="w-5 h-5" />
      </button>
    </div>

    <Popper
      v-if="showPopup"
      :offset-x="4"
      :offset-y="-2"
      placement="right-start"
      :anchor="$refs.anchor"
    >
      <GroupListItemMenu
        v-if="!updatingGroup"
        :up="canMoveUp"
        :down="canMoveDown"
        @delete="deleteGroup"
        @rename="initUpdateGroup"
        @up="moveUpGroup"
        @down="moveDownGroup"
      />
    </Popper>
  </div>
</template>

<script>
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg'
import SaveIcon from '@/assets/icons/save.svg'

export default {
  emits: ['group-selected'],
  setup() {
    const {
      selectedGroup,
      updateRemoteGroup,
      deleteRemoteGroup,
      moveUpRemoteGroup,
      moveDownRemoteGroup
    } = useLists()
    return {
      selectedGroup,
      updateRemoteGroup,
      deleteRemoteGroup,
      moveUpRemoteGroup,
      moveDownRemoteGroup
    }
  },
  components: {
    DotsVerticalIcon,
    SaveIcon
  },
  props: {
    group: {
      type: Object,
      default: null
    },
    list: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      openCollapse: false,
      showPopup: false,
      newGroupName: '',
      creatingGroup: false,
      updatingGroup: false,
      deletingGroup: false
    }
  },
  computed: {
    isSelected() {
      return this.selectedGroup && this.selectedGroup.id === this.group.id
    },
    canMoveUp() {
      return this.isSelected && this.list.groups[0].id !== this.group.id
    },
    canMoveDown() {
      return (
        this.isSelected &&
        this.list.groups[this.list.groups.length - 1].id !== this.group.id
      )
    }
  },
  methods: {
    clickOutsideHandler() {
      this.showDropdown = false
      this.clearActions()
    },
    clickOnNameHandler() {
      this.$emit('group-selected', this.group.id)
      this.showPopup = false
      // this.openCollapse = !this.openCollapse
      // this.clearActions()
      // this.creatingGroup = false
    },
    openPopup() {
      this.$emit('group-selected', this.group.id)
      this.showPopup = !this.showPopup
    },
    clearActions() {
      this.showPopup = false
      this.newGroupName = ''
      this.updatingGroup = false
    },
    async updateGroup() {
      try {
        if (!this.newGroupName || this.loading) return
        this.loading = true
        await this.updateRemoteGroup({
          name: this.newGroupName,
          group: this.group,
          list: this.list
        })
        this.loading = false
        this.clearActions()
      } catch (e) {
        this.loading = false
      }
    },
    async deleteGroup() {
      try {
        this.deletingGroup = true
        this.$gsap.to(this.$refs['deleting-scrim'], {
          opacity: 1,
          duration: 0.5,
          ease: 'none'
        })
        await this.deleteRemoteGroup({
          group: this.group,
          list: this.list
        })
        this.deletingGroup = false
        this.setSelectedGroup(this.list.groups[0])
      } catch (e) {
        console.log(e)
      }
    },
    initUpdateGroup() {
      this.updatingGroup = true
      this.newGroupName = this.group.name
      this.$nextTick(() => {
        const updateInput = this.$refs['update-group-input'].$el
        updateInput.focus()
      })
    },
    async moveUpGroup() {
      try {
        this.loading = true
        await this.moveUpRemoteGroup({
          group: this.group,
          list: this.list
        })
        this.clearActions()
      } catch (e) {}
      this.loading = false
    },
    async moveDownGroup() {
      try {
        this.loading = true
        await this.moveDownRemoteGroup({
          group: this.group,
          list: this.list
        })
        this.clearActions()
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.deleting-scrim {
  backdrop-filter: blur(3px);
}
</style>