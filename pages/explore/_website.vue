<template>
  <div>
    <div v-if="twitterLike">
      <transition name="page">
        <ModalWrapper>
          <ExploreWebsite />
        </ModalWrapper>
      </transition>
    </div>
    <div v-else>
      <transition name="page">
        <ExploreWebsite />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      twitterLike: (state) => state.twitterLike
    })
  },
  mounted() {
    console.log('mounted', this.$route)
  }
}
</script>

<style></style>
