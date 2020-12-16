<template>
  <div
    ref="menu"
    class="bg-grey-50 p-4 pb-2 rounded-lg"
    v-click-outside="closeMenu"
  >
    <div class="mb-2 text-sm">
      <span v-if="$strapi.user">
        Hello,
        <span class="font-bold-body-weight">{{ $strapi.user.username }}</span>
        👋
      </span>
      <span v-else>Hello, stranger 👀</span>
    </div>
    <hr class="text-grey-100 mb-2" />
    <ul class="text-base">
      <li class="">
        <NuxtLink
          to="/collections"
          class="font-bold-body-weight hover:text-primary-500 py-1"
          @click.native="closeMenu"
        >
          Collections
        </NuxtLink>
      </li>
      <li>
        <button
          v-if="$strapi.user"
          class="font-bold-body-weight hover:text-primary-500 py-1"
          @click="logout"
        >
          Logout
        </button>
        <button
          v-else
          class="font-bold-body-weight hover:text-primary-500 py-1"
          @click="login"
        >
          Login
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    this.openMenuAnimation()
  },
  methods: {
    login() {
      this.closeMenu()
      this.$strapi.$cookies.set(
        'redirect',
        this.redirect || this.$route.fullPath
      )
      window.location = `${this.$config.strapiURL}/connect/github`
    },
    async logout() {
      try {
        await this.$strapi.logout()
        this.closeMenu()
      } catch (e) {}
    },
    openMenuAnimation() {
      this.$gsap.set(this.$refs.menu, {
        transformOrigin: 'top right'
      })
      this.$gsap.fromTo(
        this.$refs.menu,
        {
          // borderRadius: '20px',
          opacity: 0,
          scale: 0.75,
          y: -15
        },
        {
          // borderRadius: '8px',
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: 'elastic.out(1.2, 0.75)'
        }
      )
    },
    closeMenu() {
      this.$gsap.to(this.$refs.menu, {
        // borderRadius: '20px',
        opacity: 0,
        scale: 0.75,
        y: -15,
        duration: 0.15,
        ease: 'expo.outIn',
        onComplete: () => {
          this.$emit('close-menu')
        }
      })
    }
  }
}
</script>
