<template>
  <div class="el relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-2">
      There's no Groups in "{{ list.name }}"
    </h2>
    <p class="text-center text-seven leading-seven mb-8">
      Create Group to start saving websites.
    </p>

    <div class="relative w-full h-16 mb-24 flex items-center justify-center">
      <transition :css="false" @enter="enter" @leave="leave">
        <button
          v-if="!creatingList"
          ref="create-button"
          class="absolute top-0 focus:outline-none text-seven leading-seven flex items-center py-4 px-8 rounded-xl border-2 border-transparent has-hover:hover:border-primary-500 bg-primary-50 text-primary-500 font-bold-body-weight transition-colors duration-200 truncate"
          @click="initGroupCreation"
        >
          <div class="mr-2">
            <PlusIcon class="w-5 h-5" style="stroke-width: 2.5px" />
          </div>
          <span>Create Group</span>
        </button>

        <div v-else class="max-w-24rem absolute top-0 w-full">
          <AppAutosizeTextarea
            v-if="creatingList"
            ref="create-list-tour"
            v-model="newListName"
            v-click-outside="() => (creatingList = false)"
            placeholder="Type List name"
            class="w-full text-seven leading-seven font-bold-body-weight flex py-4 px-8 rounded-xl border-2 border-transparent text-grey-900 transition-colors duration-200 placeholder-grey-400"
            @submit="createGroupMethod"
            @keydown.esc.native="clearActions"
            @click.stop.native
          />
          <div
            v-if="creatingList && newListName"
            class="absolute top-0 right-0 p-3"
          >
            <button
              title="Save"
              class="focus:outline-none bg-grey-50 border-2 border-grey-200 rounded-3lg p-2 has-hover:hover:text-grey-700"
              @click.stop="createGroupMethod"
            >
              <SaveIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlusIcon from '@/assets/icons/plus-circle.svg'
import SaveIcon from '@/assets/icons/save.svg'

export default {
  emits: ['cleanup'],
  setup() {
    const { setSelectedList, createRemoteGroup } = useLists()
    return { setSelectedList, createRemoteGroup }
  },
  components: {
    PlusIcon,
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
      newListName: '',
      creatingList: false
    }
  },
  methods: {
    clearActions() {
      this.newListName = ''
      this.$emit('cleanup')
    },
    initGroupCreation() {
      // this.$store.commit('collections/setSelectedCollection', this.list)
      this.setSelectedList(this.list)
      this.creatingList = true
      this.$nextTick(() => {
        this.$refs['create-list-tour'].$el.focus()
      })
    },
    async createGroupMethod() {
      try {
        if (!this.newListName) return
        // await this.$store.dispatch('collections/createGroup', {
        //   name: this.newListName,
        //   collection: this.list
        // })
        await this.createRemoteGroup({
          name: this.newListName,
          list: this.list
        })
        this.clearActions()
        this.creatingList = false
      } catch (e) {
        console.log(e)
      }
    },
    enter(el, done) {
      this.$refs['create-collection-tour'] &&
        this.$refs['create-collection-tour'].$el.focus()
      this.$nextTick(() => {
        this.$gsap.set(el, { position: 'absolute', transformOrigin: 'center' })
        this.$gsap.from(el, {
          scale: 0.9,
          autoAlpha: 0,
          clearProps: true,
          // y: -5,
          duration: 0.25,
          ease: 'power1.out',
          onComplete: () => {
            this.$gsap.set(el, { position: 'absolute' })
            this.$refs['create-collection-tour'] &&
              this.$refs['create-collection-tour'].$el.focus()
          }
        })
      })
    },
    leave(el, done) {
      this.$gsap.set(el, { transformOrigin: 'center' })
      this.$gsap.to(el, {
        // position: 'absolute',
        scale: 0.9,
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

<style lang="postcss" scoped>
.el {
  height: calc(100vh - calc(theme('spacing.16') + theme('spacing.8')));
}
</style>
