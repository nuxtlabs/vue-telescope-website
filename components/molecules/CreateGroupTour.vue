<template>
  <div class="el relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-4">
      There's no Lists in "{{ collection.name }}" yet
    </h2>
    <p class="text-center text-seven leading-seven mb-8">
      Create a List to start saving websites 👇
    </p>

    <div class="h-16 w-full mb-24 flex items-center justify-center">
      <transition :css="false" @enter="enter" @leave="leave">
        <button
          v-if="!creatingList"
          ref="create-button"
          class="focus:outline-none text-seven flex items-center py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700 transition-colors duration-200 truncate"
          @click="initGroupCreation"
        >
          <div class="mr-2">
            <PlusIcon class="w-4 h-4" style="stroke-width: 1.5px" />
          </div>
          <span>Create List</span>
        </button>

        <div v-else class="max-w-24rem">
          <AppAutosizeTextarea
            v-if="creatingList"
            placeholder="Type List name ..."
            ref="create-list-tour"
            v-model="newListName"
            v-click-outside="() => (creatingList = false)"
            class="w-full text-seven flex py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700 transition-colors duration-200 placeholder-grey-400"
            @submit="createGroup"
            @keydown.esc.native="clearActions"
            @click.stop.native
          />
          <div
            v-if="creatingList && newListName"
            class="absolute top-0 right-0 p-3"
          >
            <button
              title="Save"
              class="bg-grey-50 border border-grey-200 rounded-xl p-3 hover:bg-grey-200 hover:text-grey-700"
              @click.stop="createGroup"
            >
              <SaveIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PlusIcon from '@/assets/icons/plus-circle.svg?inline'
import SaveIcon from '@/assets/icons/save.svg?inline'

export default {
  components: {
    PlusIcon,
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
      this.$store.commit('collections/setSelectedCollection', this.collection)
      this.creatingList = true
      this.$nextTick(() => {
        this.$refs['create-list-tour'].$el.focus()
      })
    },
    async createGroup() {
      try {
        if (!this.newListName) return
        await this.$store.dispatch('collections/createGroup', {
          name: this.newListName,
          collection: this.collection
        })
        this.clearActions()
        this.creatingList = false
      } catch (e) {}
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
            this.$gsap.set(el, { position: 'relative' })
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
