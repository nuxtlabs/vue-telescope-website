<template>
  <div>
    <div v-if="!group">
      <div v-if="creatingGroup" class="flex items-center">
        <AppInput
          v-model="newName"
          class="flex-grow"
          size="small"
          placeholder="Group name"
          appearance="transparent"
          @keypress.enter.native="createGroup"
        />
        <div class="flex flex-grow-0">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="createGroup"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
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
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="deleteGroup"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="clearActions"
          />
        </div>
      </div>
      <div v-else-if="editingGroup" class="flex items-center">
        <AppInput
          ref="edit-input"
          v-model="newName"
          class="flex flex-grow"
          size="small"
          placeholder="Group name"
          appearance="transparent"
          @keypress.enter.native="editGroup"
        />
        <div class="flex flex-grow-0 items-center">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="editGroup"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="clearActions"
          />
          <DeleteIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="initDeleteGroup"
          />
        </div>
      </div>
      <div v-else class="flex items-center justify-between cursor-pointer py-1">
        <div class="flex flex-grow items-center" @click="select">
          <BulletIcon
            class="flex-grow-0 w-4 h-4 opacity-50 hover:opacity-100 mr-2"
          />
          <span
            class="flex-grow"
            :class="selected ? 'text-primary-500' : 'text-grey-800'"
            >{{ group.name }}</span
          >
        </div>
        <EditIcon
          v-if="selected"
          class="flex-grow-0 w-4 h-4 opacity-50 hover:opacity-100 ml-2"
          @click="initEditGroup"
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
