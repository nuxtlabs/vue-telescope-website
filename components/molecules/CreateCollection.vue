<template>
  <div class="flex ml-2 h-10 mr-2 relative">
    <transition @enter="enter" @leave="leave" :css="false">
      <button
        v-if="!creatingCollection"
        class="group w-full h-full flex items-center py-1 px-6 pr-4 text-base leading-base bg-primary-500 rounded-lg text-white"
        @click="initCollectionCreation"
      >
        <PlusIcon
          class="w-4 h-4 mr-2 opacity-100 group-hover:opacity-100"
          style="stroke-width: 1.5px"
        />
        <span class="tracking-2 opacity-100 group-hover:opacity-100">
          Add Collection
        </span>
      </button>

      <div class="w-full h-full absolute" v-if="creatingCollection">
        <AppAutosizeTextarea
          v-model="newCollectionName"
          v-click-outside="() => (creatingCollection = false)"
          ref="create-collection-tour"
          class="py-2 px-2 text-base leading-base"
          @submit="createCollection"
          @keydown.esc.native="clearActions"
          @click.stop.native
        />
      </div>
    </transition>
  </div>
</template>

<script>
import PlusIcon from '@/assets/icons/plus-circle.svg?inline'

export default {
  components: {
    PlusIcon
  },
  props: {
    // collection: {
    //   type: Object,
    //   default: null
    // }
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
        const newCollection = await this.$store.dispatch(
          'collections/createCollection',
          {
            name: this.newCollectionName
          }
        )
        this.clearActions()
        this.creatingCollection = false
      } catch (e) {}
    },
    enter(el, done) {
      this.$refs['create-collection-tour'] &&
        this.$refs['create-collection-tour'].$el.focus()
      this.$nextTick(() => {
        this.$gsap.set(el, { position: 'absolute', transformOrigin: 'left' })
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
      this.$gsap.set(el, { transformOrigin: 'left' })
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
