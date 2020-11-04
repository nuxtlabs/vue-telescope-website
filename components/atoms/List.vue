<template>
  <div>
    <div v-if="!list">
      <div v-if="creatingList" class="flex items-center">
        <AppInput
          v-model="newName"
          size="small"
          placeholder="List name"
          @keypress.enter.native="createList"
        />
        <ValidateIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="createList"
        />
        <CancelIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="clearActions"
        />
      </div>
      <div v-else class="cursor-pointer" @click="initCreateList">
        <span class="text-eight leading-eight font-display-weight"
          >+ Add list</span
        >
      </div>
    </div>
    <div v-else>
      <div v-if="deletingList" class="flex items-center">
        <span>Delete ?</span>
        <ValidateIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="deleteList"
        />
        <CancelIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="clearActions"
        />
      </div>
      <div v-else-if="editingList" class="flex items-center">
        <AppInput
          ref="edit-input"
          v-model="newName"
          size="small"
          placeholder="Group name"
          @keypress.enter.native="editList"
        />
        <ValidateIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="editList"
        />
        <CancelIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="clearActions"
        />
        <DeleteIcon
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="initDeleteList"
        />
      </div>
      <div v-else class="flex items-center cursor-pointer">
        <span
          class="text-eight leading-eight font-display-weight"
          :class="selected ? 'text-primary-500' : 'text-grey-800'"
          @click="select"
          >{{ list.name }}</span
        >
        <EditIcon
          v-if="selected && !selectedGroup"
          class="w-3 h-3 opacity-50 hover:opacity-100 ml-2"
          @click="initEditList"
        />
      </div>
      <div v-if="selected && list.groups" class="ml-4 mt-2 mb-4">
        <div v-for="group in list.groups" :key="group.id">
          <ListGroup
            :group="group"
            :list="list"
            :selected="selectedGroup === group"
            @group-selected="onGroupSelected"
          />
        </div>
        <ListGroup :list="list" />
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
      selectedGroup: null,
      newName: '',
      creatingList: false,
      editingList: false,
      deletingList: false
    }
  },
  watch: {
    selected(value) {
      if (!value) this.clearActions()
    }
  },
  methods: {
    onGroupSelected(group) {
      this.selectGroup(group, this.list)
    },
    clearActions() {
      this.newName = ''
      this.creatingList = false
      this.editingList = false
      this.deletingList = false
    },
    select() {
      this.selectedGroup = null
      this.$emit('list-selected', this.list)
    },
    selectGroup(group) {
      this.selectedGroup = group
      this.$emit('group-selected', group)
      this.clearActions()
    },
    initCreateList() {
      this.creatingList = true
    },
    async createList() {
      try {
        if (!this.newName) return
        const newList = await this.$strapi.create('lists', {
          name: this.newName
        })
        this.$store.commit('addList', newList)
        this.clearActions()
      } catch (e) {}
    },
    initEditList() {
      this.editingList = true
      this.newName = this.list.name
      this.$nextTick(() => {
        const editInput = this.$refs['edit-input'].$el
        editInput.select()
      })
    },
    async editList() {
      try {
        if (!this.newName) return
        const updatedList = await this.$strapi.update('lists', this.list.id, {
          name: this.newName
        })
        this.$store.commit('updateList', updatedList)
        this.clearActions()
      } catch (e) {}
    },
    initDeleteList() {
      this.deletingList = true
    },
    async deleteList() {
      try {
        await this.$strapi.delete('lists', this.list.id)
        this.$store.commit('deleteList', this.list)
        this.clearActions()
      } catch (e) {}
    }
  }
}
</script>
