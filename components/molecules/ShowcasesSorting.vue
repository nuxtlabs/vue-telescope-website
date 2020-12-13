<template>
  <div
    ref="wrapper"
    v-click-outside="clickOutsideHandler"
    class="opacity-0 absolute top-0 right-0 z-10 overflow-hidden -mt-9 mr-12 md:mr-6 rounded-md bg-grey-50 text-grey-900"
  >
    <div
      v-for="option in options"
      :key="option._sort"
      :class="[option._sort === selectedSort._sort && 'font-bold-body-weight']"
      class="p-1 px-2 hover:font-bold-body-weight cursor-pointer select-none overflow-hidden"
      @click="selectSorting(option)"
    >
      <div :ref="option._sort" class="flex justify-between items-center">
        <div class="text-sm leading-sm mr-2">{{ option.name }}</div>
        <component :is="option.icon" class="w-2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?inline'

export default {
  components: {
    ArrowDownIcon
  },
  data() {
    return {
      isOpened: false,
      optionHeight: 28,
      borderWidth: 0,
      options: [
        {
          name: 'Popularity',
          _sort: 'rank:asc',
          icon: 'ArrowDownIcon'
        },
        {
          name: 'Date added',
          _sort: 'lastDetectedAt:desc',
          icon: 'ArrowDownIcon'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      selectedSort: (state) => state.selectedSort
    })
  },
  watch: {
    selectedSort: {
      immediate: true,
      handler(value) {
        // handle on on page load
        this.options = [
          this.options.find((option) => option._sort === value._sort),
          ...this.options.filter((option) => option._sort !== value._sort)
        ]
      }
    }
  },
  mounted() {
    this.enterAnimation()
  },
  methods: {
    enterAnimation() {
      const wrapper = this.$refs.wrapper
      this.$gsap.set(wrapper, {
        height: this.optionHeight + 2 * this.borderWidth
      })
      this.$gsap.fromTo(
        wrapper,
        {
          opacity: 0,
          scale: 0.95,
          y: '10px'
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: 'power4.inOut'
        }
      )
    },
    selectSorting(sort) {
      if (sort._sort === this.selectedSort._sort) {
        if (!this.isOpened) {
          this.openDropdown()
        } else {
          this.closeDropdown()
        }
      } else {
        this.$store.commit('setSort', { _sort: sort._sort })
        this.closeDropdown()
      }
    },
    clickOutsideHandler() {
      // this.closeDropdown()
      // console.log('clickOutsideHandler', this.isOpened)
      if (this.isOpened) this.closeDropdown()
    },
    openDropdown() {
      this.isOpened = true
      const wrapperNode = this.$refs.wrapper
      const nameNode = this.$refs[this.options[1]._sort]
      // animate height of the wrapper (old-school fx)
      this.wrapperAnimation = this.$gsap.fromTo(
        wrapperNode,
        {
          height: this.optionHeight + 2 * this.borderWidth // 30px
        },
        {
          height: 2 * this.optionHeight + 2 * this.borderWidth, // 58px
          duration: 0.25,
          ease: 'expo.out'
        }
      )
      this.$gsap.set(nameNode, {
        transformOrigin: 'bottom'
      })
      this.nodeAnimation = this.$gsap.fromTo(
        nameNode,
        {
          y: -10,
          // scale: 0.95,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          delay: 0.05,
          duration: 0.25,
          ease: 'expo.out'
        }
      )
    },
    closeDropdown() {
      this.isOpened = false
      this.wrapperAnimation.kill()
      this.nodeAnimation.kill()
      const wrapperNode = this.$refs.wrapper
      const nameNode = this.$refs[this.options[1]._sort]
      this.$gsap.set(wrapperNode, {
        height: this.optionHeight + 2 * this.borderWidth // 30px
      })
      this.$gsap.set(nameNode, {
        y: 0,
        opacity: 1,
        scale: 1
      })
    }
  }
}
</script>

<style></style>
