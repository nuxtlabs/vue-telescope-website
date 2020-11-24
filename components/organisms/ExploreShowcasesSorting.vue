<template>
  <div
    ref="wrapper"
    v-click-outside="() => isOpened && closeDropdown()"
    class="opacity-0 absolute top-0 right-0 z-10 overflow-hidden -mt-9 mr-12 md:mr-6 rounded-md bg-grey-50 text-grey-900 shadow hover:shadow-md"
  >
    <div
      v-for="option in options"
      :key="option._sort"
      :class="[option._sort === selectedSort._sort && 'font-bold-body-weight']"
      class="flex justify-between items-center p-1 px-2 hover:bg-grey-100 hover:font-bold-body-weight cursor-pointer select-none"
      @click="selectSorting(option)"
    >
      <div class="text-sm leading-sm mr-2">{{ option.name }}</div>
      <component :is="option.icon" class="w-2" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArrowDownIcon from '@/assets/icons/arrow-down.svg?inline'
import ClickOutside from '../../directives/click-outside'

export default {
  components: {
    ArrowDownIcon
  },
  directives: {
    'click-outside': ClickOutside
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
    const wrapper = this.$refs.wrapper
    this.$gsap.set(wrapper, {
      height: this.optionHeight + 2 * this.borderWidth
    })
    this.$gsap.fromTo(
      wrapper,
      {
        opacity: 0,
        scale: 0.75,
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
  methods: {
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
    openDropdown() {
      this.isOpened = true
      this.$gsap.fromTo(
        this.$refs.wrapper,
        {
          height: this.optionHeight + 2 * this.borderWidth // 30px
        },
        {
          height: 2 * this.optionHeight + 2 * this.borderWidth, // 58px
          duration: 0.15,
          ease: 'power4.easeOut'
        }
      )
    },
    closeDropdown() {
      this.isOpened = false
      this.$gsap.to(this.$refs.wrapper, {
        height: this.optionHeight + 2 * this.borderWidth, // 30px
        duration: 0.15,
        ease: 'power4.easeOut'
      })
    }
  }
}
</script>

<style></style>
