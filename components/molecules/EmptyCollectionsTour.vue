<template>
  <div class="el relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-2">
      You don't have any Collections
    </h2>
    <p class="text-center text-seven leading-seven mb-8">
      Create a Collection to start saving websites into Lists
    </p>

    <div class="relative w-full h-16 mb-24 flex items-center justify-center">
      <transition :css="false" @enter="enter" @leave="leave">
        <button
          v-if="!creatingCollection"
          ref="create-button"
          class="absolute top-0 focus:outline-none text-seven leading-seven flex items-center py-4 px-8 rounded-xl border-2 border-transparent has-hover:hover:border-primary-500 bg-primary-50 text-primary-500 font-bold-body-weight transition-colors duration-200 truncate"
          @click="initCollectionCreation"
        >
          <div class="mr-2">
            <PlusIcon class="w-5 h-5" style="stroke-width: 2.5px" />
          </div>
          <span>Create Your First Collection</span>
        </button>

        <div
          v-else
          class="absolute top-0 w-full"
          :style="{ maxWidth: maxWidthStyles + 'px' }"
        >
          <AppAutosizeTextarea
            v-if="creatingCollection"
            ref="create-collection-tour"
            v-model="newCollectionName"
            v-click-outside="() => (creatingCollection = false)"
            placeholder="Type Collection name"
            class="w-full text-seven leading-seven font-bold-body-weight flex py-4 px-8 rounded-xl border-2 border-transparent text-grey-900 transition-colors duration-200 placeholder-grey-400"
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
              class="focus:outline-none bg-grey-50 border-2 border-grey-200 rounded-3lg p-2 has-hover:hover:text-grey-700"
              @click.stop="createCollection"
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
            this.$gsap.set(el, {
              // position: 'relative',
              maxWidth: this.maxWidthStyles + 'px'
            })
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
