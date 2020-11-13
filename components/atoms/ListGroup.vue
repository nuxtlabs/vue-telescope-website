<template>
  <div>
    <div v-if="!group">
      <div v-if="creatingGroup" class="flex items-center">
        <AppInput
          ref="add-input"
          v-model="newName"
          class="flex-grow"
          size="small"
          placeholder="Group name"
          appearance="transparent"
          @keypress.enter.native="createGroup"
          @keydown.esc.native="clearActions"
        />
        <div class="flex flex-grow-0">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="createGroup"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
            @click="clearActions"
          />
        </div>
      </div>
      <div
        v-else
        class="flex items-center justify-between cursor-pointer py-1"
        @click="initCreateGroup"
      >
        <span>Add group</span>
        <AddIcon class="w-4 h-4 ml-2" />
      </div>
    </div>
    <div v-else>
      <div v-if="deletingGroup" class="flex items-center justify-between py-1">
        <span>Delete ?</span>
        <div class="flex items-center">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="deleteGroup"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
            @click="clearActions"
          />
        </div>
      </div>
      <div v-else-if="updatingGroup" class="flex items-center">
        <AppInput
          ref="update-input"
          v-model="newName"
          class="flex flex-grow"
          size="small"
          placeholder="Group name"
          appearance="transparent"
          @keypress.enter.native="updateGroup"
          @keydown.esc.native="clearActions"
        />
        <div class="flex flex-grow-0 items-center">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="updateGroup"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
            @click="clearActions"
          />
          <DeleteIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-red-800"
            @click="initDeleteGroup"
          />
        </div>
      </div>
      <div v-else class="flex items-center justify-between cursor-pointer py-1">
        <div
          class="flex flex-grow items-center"
          @click="$parent.$emit('group-selected', group)"
        >
          <BulletIcon
            class="flex-grow-0 w-4 h-4 opacity-50 hover:opacity-100 mr-2"
          />
          <span
            class="flex-grow"
            :class="selected ? 'text-primary-500' : 'text-grey-800'"
            @dblclick="initUpdateGroup"
            >{{ group.name }}</span
          >
        </div>
        <EditIcon
          v-if="selected"
          class="flex-grow-0 w-4 h-4 opacity-50 hover:opacity-100 ml-2"
          @click="initUpdateGroup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BulletIcon from '@/assets/icons/bullet.svg?inline'
import AddIcon from '@/assets/icons/plus-circle.svg?inline'
import EditIcon from '@/assets/icons/more-vertical.svg?inline'
import ValidateIcon from '@/assets/icons/check.svg?inline'
import CancelIcon from '@/assets/icons/xmark-circle.svg?inline'
import DeleteIcon from '@/assets/icons/minus-circle.svg?inline'

export default {
  components: {
    BulletIcon,
    AddIcon,
    EditIcon,
    ValidateIcon,
    CancelIcon,
    DeleteIcon
  },
  props: {
    group: {
      type: Object,
      default: null
    },
    list: {
      type: Object,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    listsSelection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newName: '',
      creatingGroup: false,
      updatingGroup: false,
      deletingGroup: false
    }
  },
  watch: {
    listsSelection(value) {
      this.clearActions()
    }
  },
  methods: {
    clearActions() {
      this.newName = ''
      this.creatingGroup = false
      this.updatingGroup = false
      this.deletingGroup = false
    },
    initCreateGroup() {
      this.creatingGroup = true
      this.$nextTick(() => {
        const addInput = this.$refs['add-input'].$el
        addInput.select()
      })
    },
    async createGroup() {
      try {
        if (!this.newName) return
        const newGroup = await this.$store.dispatch('createGroup', {
          name: this.newName,
          list: this.list
        })
        this.$parent.$emit('group-selected', newGroup)
        this.clearActions()
      } catch (e) {}
    },
    initUpdateGroup() {
      this.updatingGroup = true
      this.newName = this.group.name
      this.$nextTick(() => {
        const updateInput = this.$refs['update-input'].$el
        updateInput.select()
      })
    },
    async updateGroup() {
      try {
        if (!this.newName) return
        await this.$store.dispatch('updateGroup', {
          name: this.newName,
          group: this.group,
          list: this.list
        })
        this.clearActions()
      } catch (e) {}
    },
    initDeleteGroup() {
      this.deletingGroup = true
    },
    async deleteGroup() {
      await this.$store.dispatch('deleteGroup', {
        group: this.group,
        list: this.list
      })
      this.$parent.$emit('group-selected', null)
    }
  }
}
</script>
