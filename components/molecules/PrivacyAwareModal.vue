<template>
  <div class="modal-wrapper">
    <div class="w-full h-full" @click.self="makeChoice(false)">
      <div
        ref="modal-wrapper"
        class="pointer-events-auto h-full relative md:h-auto bg-white m-auto max-w-readable-line-length md:mt-12 md:rounded-xl overflow-auto md:overflow-hidden overflow-x-hidden"
      >
        <h2 class="text-five leading-five font-display-weight p-4 text-center">
          Hey 👋 Vue.js developer!
        </h2>
        <div class="p-4">
          <p class="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            eum et. Libero possimus, eaque nesciunt error quaerat ipsa atque
            aspernatur nulla asperiores! Magnam nemo laudantium quae quam et
            temporibus itaque.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
            quae cumque culpa, dicta harum a architecto possimus libero quod
            natus ducimus aut quo sunt eos, reprehenderit nobis tempora,
            delectus laborum.
          </p>
        </div>
        <div class="p-4 flex justify-end">
          <AppButton appearance="transparent" @click.native="makeChoice(false)">
            Not Agree
          </AppButton>
          <AppButton appearance="primary" @click.native="makeChoice(true)">
            Agree & Proceed
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      privacyAwarenessCb: (state) => state.privacyAwarenessCb
    })
  },
  mounted() {
    this.$gsap.fromTo(
      this.$refs['modal-wrapper'],
      {
        scale: 1.2,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.inOut'
      }
    )
  },
  methods: {
    async makeChoice(choice) {
      if (choice) {
        // if user agrees on Terms
        localStorage.setItem('privacyAware', true)
        this.$store.commit('setShowPrivacyAwareModal', false)
        await this.privacyAwarenessCb()
        this.$store.commit('setPrivacyAwarenessCb', null)
      } else {
        // if not
        localStorage.setItem('privacyAware', false)
        this.$store.commit('setShowPrivacyAwareModal', false)
      }
    }
  }
}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.42); */
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  backdrop-filter: blur(18px);
  /* display: flex;
  align-items: center;
  justify-content: center; */
}
</style>
