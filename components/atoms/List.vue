<template>
  <div>
    <div v-if="!list">
      <div v-if="creatingList" class="flex items-center">
        <AppInput
          ref="add-input"
          v-model="newName"
          class="flex-grow"
          size="small"
          placeholder="List name"
          appearance="transparent"
          @keypress.enter.native="createList"
          @keydown.esc.native="clearActions"
        />
        <div class="flex flex-grow-0">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="createList"
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
        @click="initCreateList"
      >
        <span class="text-eight leading-eight font-display-weight"
          >Add collection</span
        >
        <AddIcon class="w-4 h-4 ml-2" />
      </div>
    </div>
    <div v-else>
      <div v-if="deletingList" class="flex items-center py-1">
        <span
          class="flex flex-grow text-eight leading-eight font-display-weight"
          >Delete ?</span
        >
        <ValidateIcon
          class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
          @click="deleteList"
        />
        <CancelIcon
          class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
          @click="clearActions"
        />
      </div>
      <div v-else-if="updatingList" class="flex items-center">
        <AppInput
          ref="update-input"
          v-model="newName"
          class="flex-grow"
          size="small"
          placeholder="Group name"
          appearance="transparent"
          @keypress.enter.native="updateList"
          @keydown.esc.native="clearActions"
        />
        <div class="flex flex-grow-0">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="updateList"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
            @click="clearActions"
          />
          <DeleteIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-red-800"
            @click="initDeleteList"
          />
        </div>
      </div>
      <div v-else class="flex items-center justify-between cursor-pointer py-1">
        <div
          class="flex flex-grow items-center"
          @click="$emit('list-selected', list)"
        >
          <SectionExpandedIcon
            v-if="selected"
            class="w-4 h-4 opacity-50 hover:opacity-100 mr-2"
          />
          <SectionCollapsedIcon
            v-else
            class="w-4 h-4 opacity-50 hover:opacity-100 mr-2"
          />
          <span
            class="text-eight leading-eight font-display-weight"
            :class="selected ? 'text-primary-500' : 'text-grey-800'"
            @dblclick="initUpdateList"
            >{{ list.name }}</span
          >
        </div>
        <div v-if="selected && !selectedGroup" class="flex flex-grow-0">
          <LinkIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="modalVisible = true"
          />
          <EditIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="initUpdateList"
          />
        </div>
      </div>
      <div v-if="selected && list.groups" class="flex flex-col ml-5">
        <div v-for="group in list.groups" :key="group.id">
          <ListGroup
            :group="group"
            :list="list"
            :selected="selectedGroup && selectedGroup.id === group.id"
            :lists-selection="listsSelection"
          />
        </div>
        <ListGroup :list="list" :lists-selection="listsSelection" />
      </div>
      <TwitterLikeModalWrapper
        v-if="modalVisible"
        :fetched="true"
        :blur="false"
        @close="modalVisible = false"
      >
        <div class="space-y-8 p-4">
          <h1 class="text-eight leading-eight font-display-weight">
            {{ `Embed ${list.name}` }}
          </h1>
          <AppInput
            ref="url-input"
            v-model="listUrl"
            readonly
            @click.native="$refs['url-input'].$el.select()"
          />
          <pre
            class="bg-grey-200 rounded p-2 text-sm leading-sm"
          ><code>{{ JSON.stringify(list, undefined, 2).trim() }}</code></pre>
        </div>
      </TwitterLikeModalWrapper>
    </div>
  </div>
</template>

<script>
import SectionCollapsedIcon from '@/assets/icons/chevron-right.svg?inline'
import SectionExpandedIcon from '@/assets/icons/chevron-down.svg?inline'
import AddIcon from '@/assets/icons/plus-circle.svg?inline'
import EditIcon from '@/assets/icons/more-vertical.svg?inline'
import ValidateIcon from '@/assets/icons/check.svg?inline'
import CancelIcon from '@/assets/icons/xmark-circle.svg?inline'
import DeleteIcon from '@/assets/icons/minus-circle.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'

export default {
  components: {
    SectionCollapsedIcon,
    SectionExpandedIcon,
    AddIcon,
    EditIcon,
    ValidateIcon,
    CancelIcon,
    DeleteIcon,
    LinkIcon
  },
  props: {
    list: {
      type: Object,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    selectedGroup: {
      type: Object,
      default: null
    },
    listsSelection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newName: '',
      creatingList: false,
      updatingList: false,
      deletingList: false,
      modalVisible: false
    }
  },
  computed: {
    listUrl() {
      return `${this.$config.strapiURL}/lists/${this.list.id}`
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
      this.creatingList = false
      this.updatingList = false
      this.deletingList = false
    },
    initCreateList() {
      this.creatingList = true
      this.$nextTick(() => {
        const addInput = this.$refs['add-input'].$el
        addInput.select()
      })
    },
    async createList() {
      try {
        if (!this.newName) return
        const newList = await this.$store.dispatch('createList', {
          name: this.newName
        })
        this.$emit('list-selected', newList)
        this.clearActions()
      } catch (e) {}
    },
    initUpdateList() {
      this.updatingList = true
      this.newName = this.list.name
      this.$nextTick(() => {
        const updateInput = this.$refs['update-input'].$el
        updateInput.select()
      })
    },
    async updateList() {
      try {
        if (!this.newName) return
        await this.$store.dispatch('updateList', {
          name: this.newName,
          list: this.list
        })
        this.clearActions()
      } catch (e) {}
    },
    initDeleteList() {
      this.deletingList = true
    },
    async deleteList() {
      try {
        await this.$store.dispatch('deleteList', { list: this.list })
        this.$emit('list-selected', null)
      } catch (e) {}
    }
  }
}
</script>
