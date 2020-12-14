<template>
  <div ref="menu" class="bg-grey-50 p-4">
    <div v-if="$strapi.user" class="mb-2">
      Hello, <span>{{ $strapi.user.username }}</span>
    </div>
    <ul class="text-sm">
      <li class="">
        <NuxtLink
          to="/collections"
          class="font-bold-body-weight hover:text-primary-500"
        >
          Collections
        </NuxtLink>
      </li>
      <li>
        <button
          v-if="$strapi.user"
          class="font-bold-body-weight hover:text-primary-500"
          @click="logout"
        >
          Logout
        </button>
        <button
          v-else
          class="font-bold-body-weight hover:text-primary-500"
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
    this.$gsap.set(this.$refs.menu, {
      transformOrigin: 'top right'
    })
    this.$gsap.fromTo(
      this.$refs.menu,
      {
        borderRadius: '100%',
        opacity: 0,
        scale: 0.5,
        y: -5
      },
      {
        borderRadius: '8px',
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.25,
        ease: 'expo.out'
      }
    )
  },
  methods: {
    login() {
      this.$strapi.$cookies.set(
        'redirect',
        this.redirect || this.$route.fullPath
      )
      window.location = `${this.$config.strapiURL}/connect/github`
    },
    async logout() {
      try {
        await this.$strapi.logout()
      } catch (e) {}
    }
  }
}
</script>
