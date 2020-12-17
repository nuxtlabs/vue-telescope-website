<template>
  <div class="relative flex flex-col" :class="[openCollapse && 'mb-2']">
    <div v-click-outside="clickOutsideHandler" class="relative flex group">
      <div
        ref="name-handler"
        class="flex flex-1 cursor-pointer py-2"
        tabindex="0"
        @click="clickOnNameHandler"
        @keypress.enter="clickOnNameHandler"
      >
        <FolderIcon v-if="!openCollapse" class="w-4 mr-1 my-1" />
        <OpenedFolderIcon v-else class="w-4 mr-1 my-1" />
        <span class="relative flex-1">
          <AppAutosizeTextarea
            v-if="updatingCollection"
            ref="update-collection-input"
            v-model="newCollectionName"
            class="font-bold-body-weight p-1"
            @submit="updateCollection"
            @keydown.esc.native="clearActions"
            @click.stop.native
            @keypress.enter.stop.native
          />
          <span
            v-else
            style="word-break: break-word"
            class="font-bold-body-weight p-1 inline-flex select-none"
            :class="[
              selectedCollection &&
                selectedCollection.id === collection.id &&
                'text-primary-500'
            ]"
          >
            {{ collection.name }}
          </span>

          <div v-if="updatingCollection" class="absolute top-0 right-0 p-3px">
            <button
              title="Save"
              class="bg-grey-50 border border-grey-200 rounded-md p-1"
              @click.stop="updateCollection"
            >
              <SaveIcon class="w-4 h-4" />
            </button>
          </div>
        </span>
      </div>

      <div class="w-12 h-12 ml-auto my-3">
        <button
          v-if="!updatingCollection"
          ref="anchor"
          class="group-hover:block hover:bg-grey-50 rounded-md"
          :class="[openCollapse || showDropdown ? 'block' : 'hidden']"
          @click="openDropdown"
        >
          <DotsVerticalIcon />
        </button>
      </div>

      <Popper
        v-if="showDropdown"
        :offset-x="4"
        :offset-y="-2"
        placement="right-start"
        :anchor="$refs.anchor"
      >
        <CollectionsListItemMenu
          v-if="!updatingCollection"
          @delete="deleteCollection"
          @rename="initUpdateCollection"
        />
      </Popper>
    </div>

    <!-- Group Collapsible -->
    <transition :css="false" @enter="enter" @leave="leave">
      <div v-if="openCollapse">
        <div>
          <!-- <pre v-if="selectedGroup && collection.id === selectedGroup.list">
            {{ selectedGroup }}
          </pre> -->

          <GroupListItem
            v-for="group in reversedGroups"
            :key="group.id"
            :group="group"
            :collection="collection"
            tabindex="0"
            class="pl-6"
            @group-selected="groupSelectionHandler($event, group)"
          />

          <CreateGroup :collection="collection" @cleanup="clearActions" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg?inline'
import FolderIcon from '@/assets/icons/folder.svg?inline'
import OpenedFolderIcon from '@/assets/icons/opened-folder.svg?inline'
import SaveIcon from '@/assets/icons/save.svg?inline'

export default {
  components: {
    DotsVerticalIcon,
    FolderIcon,
    OpenedFolderIcon,
    SaveIcon
  },
  props: {
    collection: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      openCollapse: false,
      showDropdown: false,
      newCollectionName: '',
      // newGroupName: '',
      // creatingCollection: false,
      updatingCollection: false
      // deletingCollection: false,
      // creatingGroup: false
      // modalVisible: false
    }
  },
  computed: {
    ...mapState({
      selectedCollection: (state) => state.collections.selectedCollection,
      selectedGroup: (state) => state.collections.selectedGroup
    }),
    reversedGroups() {
      // TODO: sort by created
      const r = [...this.collection.groups]
      return r.sort(function (a, b) {
        const keyA = new Date(a.created_at)
        const keyB = new Date(b.created_at)
        if (keyA < keyB) return -1
        if (keyA > keyB) return 1
        return 0
      })
    }
  },
  mounted() {
    // this.$emit('collection-selected', this.collection.id)
    if (this.selectedCollection.id === this.collection.id) {
      this.openCollapse = true
    }
  },
  methods: {
    openDropdown() {
      // this.$emit('collection-selected', this.collection.id)
      this.$store.commit('collections/setSelectedCollection', this.collection)
      this.showDropdown = !this.showDropdown
    },
    clickOutsideHandler() {
      this.showDropdown = false
      this.clearActions()
    },
    clickOnNameHandler() {
      // this.$emit('collection-selected', this.collection.id)
      this.$store.commit('collections/setSelectedCollection', this.collection)
      this.$store.commit(
        'collections/setSelectedGroup',
        this.collection.groups[0]
      )
      this.openCollapse = !this.openCollapse
      this.clearActions()
      // this.creatingGroup = false
    },
    clearActions() {
      this.showDropdown = false
      this.newCollectionName = ''
      // this.creatingCollection = false
      this.updatingCollection = false
      // this.newGroupName = ''
      // this.deletingCollection = false
    },
    // async deleteCollection() {
    //   this.$emit('delete-collection')
    // },
    async deleteCollection() {
      try {
        this.showDropdown = false
        await this.$store.dispatch('collections/deleteCollection', {
          collection: this.collection
        })
        // this.selectedCollection = null
      } catch (e) {}
    },
    initUpdateCollection() {
      // popperInstance.forceUpdate()
      this.updatingCollection = true
      // this.creatingGroup = false
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
        this.$refs['name-handler'].focus()
      } catch (e) {}
    },
    groupSelectionHandler($event, group) {
      this.$store.commit('collections/setSelectedGroup', $event ? group : null)
      this.$store.commit(
        'collections/setSelectedCollection',
        $event ? this.collection : null
      )
    },
    enter(el, done) {
      this.$nextTick(() => {
        this.$gsap.set(el, { height: 'auto' })
        this.$gsap.from(el, {
          height: 0,
          autoAlpha: 0,
          clearProps: true,
          // y: -5,
          duration: 0.25,
          ease: 'power1.out',
          onComplete: done
        })
      })
    },
    leave(el, done) {
      this.$gsap.to(el, {
        height: 0,
        autoAlpha: 0,
        // y: -5,
        clearProps: true,
        duration: 0.25,
        ease: 'power1.out',
        onComplete: done
      })
    }
  }
}
</script>

<style></style>
