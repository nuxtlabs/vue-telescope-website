<template>
  <div class="relative flex flex-col">
    <div v-click-outside="clickOutsideHandler" class="relative flex group">
      <div
        ref="name-handler"
        class="focus:outline-none flex flex-1 cursor-pointer py-2"
        tabindex="0"
        @click="clickOnNameHandler"
        @keypress.enter="clickOnNameHandler"
      >
        <FolderIcon
          v-if="!openCollapse"
          class="w-5 mr-1 my-1"
          :class="[isSelected && 'text-primary-500']"
        />
        <OpenedFolderIcon
          v-else
          class="w-5 mr-1 my-1"
          :class="[isSelected && 'text-primary-500']"
        />
        <span class="relative flex flex-1 text-eight leading-eight">
          <AppAutosizeTextarea
            v-if="updatingCollection"
            ref="update-collection-input"
            v-model="newCollectionName"
            class="font-bold-body-weight p-1 rounded-md mr-1"
            @submit="updateCollection"
            @keydown.esc.native="clearActions"
            @click.stop.native
            @keypress.enter.stop.native
          />
          <span
            v-else
            style="word-break: break-word"
            class="font-bold-body-weight p-1 inline-flex select-none mr-1"
            :class="[isSelected && 'text-primary-500']"
          >
            {{ collection.name }}
          </span>
        </span>
      </div>

      <div class="w-8 h-8 ml-auto my-2">
        <button
          v-if="!updatingCollection"
          ref="anchor"
          class="focus:outline-none has-hover:group-hover:flex items-center justify-center rounded-lg w-full h-full"
          :class="[
            openCollapse || showDropdown ? 'flex' : 'hidden',
            showDropdown ? 'bg-grey-50' : 'has-hover:hover:bg-grey-50'
          ]"
          @click="openDropdown"
        >
          <DotsVerticalIcon />
        </button>

        <button
          v-else
          title="Save"
          class="focus:outline-none bg-grey-50 rounded-md p-2"
          @click.stop="updateCollection"
        >
          <AppLoader
            v-if="loading"
            class="w-4 h-4"
            background="text-grey-400"
            path="text-grey-200"
          />
          <SaveIcon v-else class="w-4 h-4" />
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
          @share="shareCollection = true"
        />
      </Popper>
    </div>

    <Portal to="default-layout">
      <LazyShareCollectionModal
        v-if="shareCollection"
        :collection="collection"
        @close="shareCollection = false"
      />
    </Portal>

    <!-- Group Collapsible -->
    <transition :css="false" @enter="enter" @leave="leave">
      <div v-if="openCollapse">
        <div>
          <ListItem
            v-for="list in reversedLists"
            :key="list.id"
            :group="list"
            :collection="collection"
            tabindex="0"
            class="pl-6"
            @group-selected="groupSelectionHandler($event, list)"
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
      loading: false,
      clicked: 0,
      openCollapse: false,
      showDropdown: false,
      newCollectionName: '',
      // newGroupName: '',
      // creatingCollection: false,
      updatingCollection: false,
      // deletingCollection: false,
      // creatingGroup: false
      shareCollection: false
    }
  },
  computed: {
    ...mapState({
      selectedCollection: (state) => state.collections.selectedCollection,
      selectedGroup: (state) => state.collections.selectedGroup,
      isMobile: (state) => state.isMobile
    }),
    isSelected() {
      return (
        this.selectedCollection &&
        this.selectedCollection.id === this.collection.id
      )
    },
    reversedLists() {
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
  watch: {
    selectedCollection(newValue) {
      if (newValue.id !== this.collection.id && this.openCollapse) {
        this.openCollapse = false
      }
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
      this.$store.commit(
        'collections/setSelectedGroup',
        this.collection.groups[0]
      )
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
      if (!this.openCollapse) {
        this.openCollapse = true
      }

      // // more nice behaviour
      // if (!this.openCollapse) {
      //   this.openCollapse = true
      // } else {
      //   if (this.clicked === 0) {
      //     this.clicked++
      //   } else if (this.clicked === 1) {
      //     this.openCollapse = !this.openCollapse
      //     this.clicked = 0
      //   } else {
      //     this.clicked = 0
      //   }
      // }
      this.clearActions()
      // this.clicked = 0
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
        if (!this.newCollectionName || this.loading) return
        this.loading = true
        await this.$store.dispatch('collections/updateCollection', {
          name: this.newCollectionName,
          collection: this.collection
        })
        this.loading = false
        this.clearActions()
        this.$refs['name-handler'].focus()
      } catch (e) {
        this.loading = false
      }
    },
    groupSelectionHandler($event, group) {
      this.$store.commit('collections/setSelectedGroup', $event ? group : null)
      this.$store.commit(
        'collections/setSelectedCollection',
        $event ? this.collection : null
      )
      if (this.isMobile) {
        console.log('NOT WORKING')
        this.$emit('close-menu')
      }
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
