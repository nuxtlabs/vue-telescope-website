<template>
  <div class="el relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-2">
      You don't have any Collections yet 🤓
    </h2>
    <p class="text-center text-seven leading-seven mb-4">
      Create a Collection to start saving and organizing websites into Lists 👇
    </p>

    <div class="h-16 w-full mb-24 flex items-center justify-center">
      <transition :css="false" @enter="enter" @leave="leave">
        <button
          v-if="!creatingCollection"
          ref="create-button"
          class="focus:outline-none text-seven flex items-center py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700 transition-colors duration-200 truncate"
          @click="initCollectionCreation"
        >
          <div class="mr-2">
            <PlusIcon class="w-4 h-4" style="stroke-width: 2px" />
          </div>
          <span>Create Your First Collection</span>
        </button>

        <div v-else class="w-full">
          <div
            :style="{ maxWidth: maxWidthStyles + 'px' }"
            class="relative m-auto"
          >
            <AppAutosizeTextarea
              placeholder="Type Collection name ..."
              v-if="creatingCollection"
              ref="create-collection-tour"
              v-model="newCollectionName"
              v-click-outside="() => (creatingCollection = false)"
              class="w-full text-seven flex py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700 transition-colors duration-200 placeholder-grey-400"
              @submit="createCollection"
              @keydown.esc.native="clearActions"
              @click.stop.native
            />
            <div
              v-if="creatingCollection && newCollectionName"
              class="absolute top-0 right-0 p-3"
            >
              <button
                title="Save"
                class="bg-grey-50 border border-grey-200 rounded-xl p-3 hover:bg-grey-200 hover:text-grey-700"
                @click.stop="createCollection"
              >
                <SaveIcon class="w-4 h-4" />
              </button>
            </div>
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
  data() {
    return {
      newCollectionName: '',
      creatingCollection: false,
      maxWidthStyles: ''
    }
  },
  methods: {
    clearActions() {
      this.newCollectionName = ''
      this.$emit('cleanup')
    },
    initCollectionCreation() {
      this.maxWidthStyles = this.$refs[
        'create-button'
      ].getBoundingClientRect().width
      // this.$store.commit('collections/setSelectedCollection', this.collection)
      this.creatingCollection = true
      this.$nextTick(() => {
        this.$refs['create-collection-tour'].$el.focus()
      })
    },
    async createCollection() {
      try {
        if (!this.newCollectionName) return
        await this.$store.dispatch('collections/createCollection', {
          name: this.newCollectionName
        })
        this.clearActions()
        this.creatingCollection = false
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
      this.$gsap.set(el, { position: 'absolute', transformOrigin: 'center' })
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
