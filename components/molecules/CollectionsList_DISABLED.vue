<template>
  <div>
    <div v-if="!collection">
      <div v-if="creatingCollection" class="flex items-center">
        <AppInput
          ref="add-input"
          v-model="newName"
          class="flex-grow"
          size="small"
          placeholder="Collection name"
          appearance="transparent"
          @keypress.enter.native="createCollection"
          @keydown.esc.native="clearActions"
        />
        <div class="flex flex-grow-0">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="createCollection"
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
        @click="initCreateCollection"
      >
        <span class="text-eight leading-eight font-display-weight">
          Add collection
        </span>
        <AddIcon class="w-4 h-4 ml-2" />
      </div>
    </div>
    <div v-else>
      <div v-if="deletingCollection" class="flex items-center py-1">
        <span
          class="flex flex-grow text-eight leading-eight font-display-weight"
        >
          Delete ?
        </span>
        <ValidateIcon
          class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
          @click="deleteCollection"
        />
        <CancelIcon
          class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
          @click="clearActions"
        />
      </div>
      <div v-else-if="updatingCollection" class="flex items-center">
        <AppInput
          ref="update-input"
          v-model="newName"
          class="flex-grow"
          size="small"
          placeholder="Group name"
          appearance="transparent"
          @keypress.enter.native="updateCollection"
          @keydown.esc.native="clearActions"
        />
        <div class="flex flex-grow-0">
          <ValidateIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-green-500"
            @click="updateCollection"
          />
          <CancelIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer"
            @click="clearActions"
          />
          <DeleteIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2 cursor-pointer text-red-800"
            @click="initDeleteCollection"
          />
        </div>
      </div>
      <div v-else class="flex items-center justify-between cursor-pointer py-1">
        <CollectionListItem
          :name="collection.name"
          :selected="selected"
          @click.native="$emit('collection-selected', collection)"
          @update="initUpdateCollection"
        />
        <div v-if="selected && !selectedGroup" class="flex flex-grow-0">
          <LinkIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="modalVisible = true"
          />
          <EditIcon
            class="w-4 h-4 opacity-50 hover:opacity-100 ml-2"
            @click="initUpdateCollection"
          />
        </div>
      </div>
      <div v-if="selected && collection.groups" class="flex flex-col ml-5">
        <div v-for="group in collection.groups" :key="group.id">
          <CollectionGroup
            :group="group"
            :collection="collection"
            :selected="selectedGroup && selectedGroup.id === group.id"
            :collections-selection="collectionsSelection"
          />
        </div>
        <CollectionGroup
          :collection="collection"
          :collections-selection="collectionsSelection"
        />
      </div>
      <TwitterLikeModalWrapper
        v-if="modalVisible"
        :fetched="true"
        :blur="false"
        @close="modalVisible = false"
      >
        <div class="space-y-6 p-4">
          <h1 class="text-eight leading-eight font-display-weight">
            {{ `Embed ${collection.name}` }}
          </h1>
          <div>
            <span>API url to request :</span>
            <AppInput
              ref="url-input"
              v-model="collectionUrl"
              class="mt-2"
              readonly
              @click.native="$refs['url-input'].$el.select()"
            />
          </div>
          <div>
            <span>Response :</span>
            <pre
              class="bg-grey-200 rounded p-2 text-sm leading-sm mt-2"
            ><code>{{ JSON.stringify(collection, undefined, 2).trim() }}</code></pre>
          </div>
        </div>
      </TwitterLikeModalWrapper>
    </div>
  </div>
</template>

<script>
import AddIcon from '@/assets/icons/plus-circle.svg?inline'
import EditIcon from '@/assets/icons/dots-vertical.svg?inline'
import ValidateIcon from '@/assets/icons/check.svg?inline'
import CancelIcon from '@/assets/icons/xmark-circle.svg?inline'
import DeleteIcon from '@/assets/icons/minus-circle.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'

export default {
  components: {
    AddIcon,
    EditIcon,
    ValidateIcon,
    CancelIcon,
    DeleteIcon,
    LinkIcon
  },
  props: {
    collection: {
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
    collectionsSelection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newName: '',
      creatingCollection: false,
      updatingCollection: false,
      deletingCollection: false,
      modalVisible: false
    }
  },
  computed: {
    collectionUrl() {
      return `${this.$config.strapiURL}/lists/${this.collection.id}`
    }
  },
  watch: {
    collectionsSelection(value) {
      this.clearActions()
    }
  },
  methods: {
    clearActions() {
      this.newName = ''
      this.creatingCollection = false
      this.updatingCollection = false
      this.deletingCollection = false
    },
    initCreateCollection() {
      this.creatingCollection = true
      this.$nextTick(() => {
        const addInput = this.$refs['add-input'].$el
        addInput.select()
      })
    },
    async createCollection() {
      try {
        if (!this.newName) return
        const newCollection = await this.$store.dispatch(
          'collections/createCollection',
          {
            name: this.newName
          }
        )
        this.$emit('collection-selected', newCollection)
        this.clearActions()
      } catch (e) {}
    },
    initUpdateCollection() {
      this.updatingCollection = true
      this.newName = this.collection.name
      this.$nextTick(() => {
        const updateInput = this.$refs['update-input'].$el
        updateInput.select()
      })
    },
    async updateCollection() {
      try {
        if (!this.newName) return
        await this.$store.dispatch('collections/updateCollection', {
          name: this.newName,
          collection: this.collection
        })
        this.clearActions()
      } catch (e) {}
    },
    initDeleteCollection() {
      this.deletingCollection = true
    },
    async deleteCollection() {
      try {
        await this.$store.dispatch('collections/deleteCollection', {
          collection: this.collection
        })
        this.$emit('collection-selected', null)
      } catch (e) {}
    }
  }
}
</script>
