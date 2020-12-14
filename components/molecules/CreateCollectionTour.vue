<template>
  <div class="relative flex items-center justify-center">
    <transition :css="false" @enter="enter" @leave="leave">
      <!--  <button
      class="text-seven flex py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700"
      @click="addCollection"
      title="Create collection"
    >
      <span class="mr-2">Create Your First Collection</span>
      <div class="pt-2">
        <PlusIcon class="w-4 h-4" style="stroke-width: 1.5px" />
      </div>
    </button> -->

      <button
        v-if="!creatingCollection"
        class="text-seven flex py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700 transition-colors duration-200"
        @click="initCollectionCreation"
      >
        <span class="mr-2">Create Your First Collection</span>
        <div class="pt-2">
          <PlusIcon class="w-4 h-4" style="stroke-width: 1.5px" />
        </div>
      </button>

      <div v-else class="max-w-24rem">
        <AppAutosizeTextarea
          v-if="creatingCollection"
          ref="create-collection-tour"
          v-model="newCollectionName"
          v-click-outside="() => (creatingCollection = false)"
          class="w-full text-seven flex py-4 px-8 rounded-xl border border-grey-100 hover:border-grey-50 hover:bg-grey-50 text-grey-500 hover:text-grey-700 transition-colors duration-200"
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
    </transition>
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
      creatingCollection: false
    }
  },
  methods: {
    clearActions() {
      this.newCollectionName = ''
      this.$emit('cleanup')
    },
    initCollectionCreation() {
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
