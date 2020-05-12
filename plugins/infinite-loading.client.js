import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'spiral'
  },
  slots: {
    noMore: 'You\'ve reached the end of the list',
    noResults: 'You\'ve reached the end of the list'
  }
})
