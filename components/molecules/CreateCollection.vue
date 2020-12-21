<template>
  <div class="flex ml-2 mr-4 relative">
    <transition :css="false" @enter="enter" @leave="leave">
      <div v-if="creatingCollection" class="w-full h-full absolute">
        <AppAutosizeTextarea
          ref="create-collection-tour"
          v-model="name"
          v-click-outside="() => (creatingCollection = false)"
          placeholder="Type Collection"
          class="rounded-2lg py-2 px-4 text-base leading-base font-bold-body-weight placeholder-grey-500"
          @submit="createCollection"
          @keydown.esc.native="clearActions"
          @click.stop.native
        />
        <!-- Todo: loading state -->
        <!-- Save button -->
      </div>
      <button
        v-else
        ref="create-button"
        class="group focus:outline-none w-full h-10 flex items-center py-1 px-4 text-base leading-base font-bold-body-weight bg-primary-50 border-2 border-transparent hover:border-primary-500 rounded-2lg text-primary-500 transition-colors duration-200"
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
      name: '',
      // loading: false,
      creatingCollection: false
    }
  },
  methods: {
    clearActions() {
      this.name = ''
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
      if (!this.name) return
      try {
        // this.loading = true
        await this.$store.dispatch('collections/createCollection', {
          name: this.name
        })
        this.name = ''
        this.clearActions()
        // this.loading = false
        this.creatingCollection = false
      } catch (e) {
        // this.loading = false
        // TODO: display toast with error
      }
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
