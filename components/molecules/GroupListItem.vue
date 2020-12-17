<template>
  <div
    v-click-outside="clickOutsideHandler"
    class="focus:outline-none group flex"
  >
    <span
      class="cursor-pointer flex-1 relative"
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
        :class="[
          selectedGroup && selectedGroup.id === group.id && 'text-primary-500'
        ]"
      >
        {{ group.name }}
      </span>

      <div
        v-if="updatingGroup"
        class="absolute top-0 right-0 pl-3px transform translate-x-full"
      >
        <button
          title="Save"
          class="focus:outline-none bg-grey-50 rounded-md p-2"
          @click.stop="updateGroup"
        >
          <SaveIcon class="w-4 h-4" />
        </button>
      </div>
    </span>

    <div class="w-8 h-8 ml-auto">
      <button
        v-if="!updatingGroup"
        ref="anchor"
        class="focus:outline-none group-hover:flex hover:bg-grey-50 rounded-lg w-full h-full items-center justify-center"
        :class="[openCollapse || showPopup ? 'flex' : 'hidden']"
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
        @delete="deleteGroup"
        @rename="initUpdateGroup"
      />
    </Popper>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg?inline'
import SaveIcon from '@/assets/icons/save.svg?inline'

export default {
  components: {
    DotsVerticalIcon,
    SaveIcon
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
  data() {
    return {
      openCollapse: false,
      showPopup: false,
      newGroupName: '',
      creatingGroup: false,
      updatingGroup: false
    }
  },
  computed: {
    ...mapState({
      // selectedCollection: (state) => state.collections.selectedCollection,
      selectedGroup: (state) => state.collections.selectedGroup
    })
  },
  // created() {
  //   if (process.browser) {
  //     this.$emitter.on('clearSiblings', this.clearActions);
  //   }
  // },
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
        if (!this.newGroupName) return
        await this.$store.dispatch('collections/updateGroup', {
          name: this.newGroupName,
          group: this.group,
          collection: this.collection
        })
        this.clearActions()
      } catch (e) {}
    },
    async deleteGroup() {
      try {
        await this.$store.dispatch('collections/deleteGroup', {
          group: this.group,
          collection: this.collection
        })
      } catch (e) {}
    },
    initUpdateGroup() {
      this.updatingGroup = true
      this.newGroupName = this.group.name
      this.$nextTick(() => {
        const updateInput = this.$refs['update-group-input'].$el
        updateInput.focus()
      })
    }
  }
}
</script>
