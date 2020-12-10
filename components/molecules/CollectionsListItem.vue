<template>
  <div class="relative flex flex-col py-1">
    <div
      v-click-outside="clickOutsideHandler"
      class="flex justify-between items-start"
    >
      <span class="w-full">
        <AppAutosizeTextarea
          v-if="updatingCollection"
          ref="update-collection-input"
          v-model="newCollectionName"
          @submit="updateCollection"
          @keydown.esc.native="clearActions"
        />
        <span
          v-else
          style="word-break: break-word"
          @click="$emit('collection-selected', collection.id)"
        >
          {{ collection.name }}
        </span>
      </span>

      <button ref="anchor" @click="nope">
        <DotsVerticalIcon />
      </button>

      <Popper
        placement="right-start"
        v-if="showDropdown"
        :anchor="$refs.anchor"
        v-slot:default="{ popperInstance }"
      >
        <CollectionsListItemMenu
          v-if="!updatingCollection"
          @delete="deleteCollection"
          @rename="initUpdateCollection"
        />
        <div v-else>SAVE</div>
      </Popper>
    </div>
    <div>groups</div>
  </div>
</template>

<script>
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg?inline'
import ClickOutside from '@/directives/click-outside'

export default {
  components: {
    DotsVerticalIcon
  },
  directives: {
    'click-outside': ClickOutside
  },
  props: {
    collection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      showDropdown: false,
      newCollectionName: '',
      // creatingCollection: false,
      updatingCollection: false
      // deletingCollection: false,
      // modalVisible: false
    }
  },
  methods: {
    nope() {
      this.$emit('collection-selected', this.collection.id)
      this.showDropdown = !this.showDropdown
    },
    clickOutsideHandler() {
      this.showDropdown = false
      this.clearActions()
    },
    clearActions() {
      this.showDropdown = false
      this.newCollectionName = ''
      // this.creatingCollection = false
      this.updatingCollection = false
      // this.deletingCollection = false
    },
    async deleteCollection() {
      try {
        await this.$store.dispatch('collections/deleteCollection', {
          collection: this.collection
        })
        this.$emit('collection-selected', null)
      } catch (e) {}
    },
    initUpdateCollection() {
      // popperInstance.forceUpdate()
      this.updatingCollection = true
      this.newCollectionName = this.collection.name
      this.$nextTick(() => {
        this.$refs['update-collection-input'].$el.focus()
      })
    },
    async updateCollection() {
      try {
        if (!this.newCollectionName) return
        await this.$store.dispatch('collections/updateCollection', {
          name: this.newCollectionName,
          collection: this.collection
        })
        this.clearActions()
      } catch (e) {}
    }
  }
}
</script>

<style></style>
