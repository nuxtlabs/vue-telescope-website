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
            v-if="updatingList"
            ref="update-list-input"
            v-model="newListName"
            class="font-bold-body-weight p-1 rounded-md mr-1"
            @submit="updateList"
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
            {{ list.name }}
          </span>
        </span>
      </div>

      <div class="w-8 h-8 ml-auto my-2">
        <button
          v-if="!updatingList"
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
          @click.stop="updateList"
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
        <ListNavItemPopup
          v-if="!updatingList"
          @delete="deleteList"
          @rename="initUpdateList"
          @share="shareList = true"
        />
      </Popper>
    </div>

    <teleport to="body">
      <LazyShareListModal
        v-if="shareList"
        :list="list"
        @close="shareList = false"
      />
    </teleport>

    <!-- Group Collapsible -->
    <transition :css="false" @enter="enter" @leave="leave">
      <div v-if="openCollapse">
        <div>
          <GroupNavItem
            v-for="group in reversedListGroups"
            :key="group.id"
            :group="group"
            :list="list"
            tabindex="0"
            class="pl-6"
            @group-selected="groupSelectionHandler($event, group)"
          />

          <CreateGroupButton :list="list" @cleanup="clearActions" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import DotsVerticalIcon from '@/assets/icons/dots-vertical.svg'
import FolderIcon from '@/assets/icons/folder.svg'
import OpenedFolderIcon from '@/assets/icons/opened-folder.svg'
import SaveIcon from '@/assets/icons/save.svg'

export default {
  emits: ['close-menu'],
  setup() {
    const {
      selectedList,
      selectedGroup,
      setSelectedList,
      setSelectedGroup,
      deleteRemoteList,
      updateRemoteList
    } = useLists()
    const { isMobile } = useUserAgent()
    return {
      selectedList,
      selectedGroup,
      setSelectedList,
      setSelectedGroup,
      deleteRemoteList,
      updateRemoteList,
      isMobile
    }
  },
  components: {
    DotsVerticalIcon,
    FolderIcon,
    OpenedFolderIcon,
    SaveIcon
  },
  props: {
    list: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      // clicked: 0,
      openCollapse: false,
      showDropdown: false,
      newListName: '',
      updatingList: false,
      shareList: false
    }
  },
  computed: {
    isSelected() {
      return this.selectedList && this.selectedList.id === this.list.id
    },
    reversedListGroups() {
      const r = [...this.list.groups]
      return r.sort(
        (a, b) =>
          a.position - b.position ||
          new Date(a.created_at) - new Date(b.created_at)
      )
    }
  },
  watch: {
    selectedList(newValue) {
      if (newValue && newValue.id !== this.list.id && this.openCollapse) {
        this.openCollapse = false
      }
    }
  },
  mounted() {
    if (this.selectedList.id === this.list.id) {
      this.openCollapse = true
    }
  },
  methods: {
    openDropdown() {
      this.showDropdown = !this.showDropdown
    },
    clickOutsideHandler() {
      this.showDropdown = false
      this.clearActions()
    },
    clickOnNameHandler() {
      this.setSelectedList(this.list)
      this.setSelectedGroup(this.list.groups[0])
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
      this.newListName = ''
      this.updatingList = false
    },
    async deleteList() {
      try {
        this.showDropdown = false
        await this.deleteRemoteList({
          list: this.list
        })
      } catch (e) {
        console.log(e)
      }
    },
    initUpdateList() {
      // popperInstance.forceUpdate()
      this.updatingList = true
      // this.creatingGroup = false
      this.newListName = this.list.name
      this.$nextTick(() => {
        this.$refs['update-list-input'].$el.focus()
      })
    },
    async updateList() {
      try {
        if (!this.newListName || this.loading) return
        this.loading = true
        await this.updateRemoteList({
          name: this.newListName,
          list: this.list
        })
        this.loading = false
        this.clearActions()
        this.$refs['name-handler'].focus()
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    },
    groupSelectionHandler($event, group) {
      this.setSelectedGroup($event ? group : null)
      this.setSelectedList($event ? this.list : null)
      if (this.isMobile) {
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
