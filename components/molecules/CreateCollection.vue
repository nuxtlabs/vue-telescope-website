<template>
  <div class="flex ml-2 h-10 mr-4 relative">
    <transition :css="false" @enter="enter" @leave="leave">
      <button
        ref="create-button"
        v-if="!creatingCollection"
        class="group focus:outline-none w-full h-full flex items-center py-1 px-4 text-base leading-base font-bold-body-weight bg-primary-50 border border-transparent hover:border-primary-500 rounded-2lg text-primary-500 transition-colors duration-200"
        @click="initCollectionCreation"
      >
        <PlusIcon
          class="w-4 h-4 mr-2 opacity-100 group-hover:opacity-100"
          style="stroke-width: 2px"
        />
        <span class="tracking-1 opacity-100 group-hover:opacity-100 truncate">
          Add Collection
        </span>
      </button>

      <div v-if="creatingCollection" class="w-full h-full absolute">
        <AppAutosizeTextarea
          placeholder="Type Collection"
          ref="create-collection-tour"
          v-model="newCollectionName"
          v-click-outside="() => (creatingCollection = false)"
          class="rounded-2lg py-2 px-4 text-base leading-base font-bold-body-weight placeholder-grey-500"
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
