<template>
  <div>
    <div v-if="!group">
      <div v-if="creatingGroup" class="flex items-center">
        <AppInput
          v-model="newName"
          size="small"
          placeholder="Group name"
          @keypress.enter.native="createGroup"
        />
        <ValidateIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="createGroup"
        />
        <CancelIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="clearActions"
        />
      </div>
      <div v-else class="cursor-pointer" @click="initCreateGroup">
        <span>+ Add group</span>
      </div>
    </div>
    <div v-else>
      <div v-if="deletingGroup" class="flex items-center">
        <span>Delete ?</span>
        <ValidateIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="deleteGroup"
        />
        <CancelIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="clearActions"
        />
      </div>
      <div v-else-if="editingGroup" class="flex items-center">
        <AppInput
          ref="edit-input"
          v-model="newName"
          size="small"
          placeholder="Group name"
          @keypress.enter.native="editGroup"
        />
        <ValidateIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="editGroup"
        />
        <CancelIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="clearActions"
        />
        <DeleteIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="initDeleteGroup"
        />
      </div>
      <div v-else class="flex items-center cursor-pointer">
        <span
          :class="selected ? 'text-primary-500' : 'text-grey-800'"
          @click="select"
          >{{ group.name }}</span
        >
        <EditIcon
          v-if="selected"
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="initEditGroup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditIcon from '@/assets/icons/config.svg?inline'
import ValidateIcon from '@/assets/icons/checkmark-circle-fill.svg?inline'
import CancelIcon from '@/assets/icons/arrow-left.svg?inline'
import DeleteIcon from '@/assets/icons/xmark-circle.svg?inline'

export default {
  components: {
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
    }
  },
  data() {
    return {
      newName: '',
      creatingGroup: false,
      editingGroup: false,
      deletingGroup: false
    }
  },
  watch: {
    selected(value) {
      if (!value) this.clearActions()
    }
  },
  methods: {
    clearActions() {
      this.newName = ''
      this.creatingGroup = false
      this.editingGroup = false
      this.deletingGroup = false
    },
    select() {
      this.$emit('group-selected', this.group)
    },
    initCreateGroup() {
      this.select()
      this.creatingGroup = true
    },
    async createGroup() {
      try {
        if (!this.newName) return
        const newGroup = await this.$strapi.create('list-groups', {
          name: this.newName,
          list: this.list.id
        })
        newGroup.list = this.list.id
        this.$store.commit('addGroup', { group: newGroup, list: this.list })
        this.clearActions()
      } catch (e) {}
    },
    initEditGroup() {
      this.editingGroup = true
      this.newName = this.group.name
      this.$nextTick(() => {
        const editInput = this.$refs['edit-input'].$el
        editInput.select()
      })
    },
    async editGroup() {
      try {
        if (!this.newName) return
        const updatedGroup = await this.$strapi.update(
          'list-groups',
          this.group.id,
          {
            name: this.newName
          }
        )
        updatedGroup.list = this.list.id
        this.$store.commit('updateGroup', {
          group: updatedGroup,
          list: this.list
        })
        this.select()
        this.clearActions()
      } catch (e) {}
    },
    initDeleteGroup() {
      this.deletingGroup = true
    },
    async deleteGroup() {
      try {
        await this.$strapi.delete('list-groups', this.group.id)
        this.$store.commit('deleteGroup', {
          group: this.group,
          list: this.list
        })
        this.select()
        this.clearActions()
      } catch (e) {}
    }
  }
}
</script>
