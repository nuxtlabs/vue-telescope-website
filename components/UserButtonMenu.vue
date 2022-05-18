<template>
  <div
    ref="el"
    v-click-outside="closeMenu"
    class="bg-grey-50 rounded-lg opacity-0"
  >
    <div class="text-sm p-4">
      <!-- <span v-if="$strapi.user">
        Hello,
        <span class="font-bold-body-weight">{{ $strapi.user.username }}</span>
        👋
      </span>
      <span v-else>Hello, stranger 👀</span> -->
      <span>Hello, stranger 👀</span>
    </div>
    <hr class="text-grey-100" />
    <ul class="text-base p-2">
      <li class="flex">
        <NuxtLink
          to="/collections"
          class="text-left font-bold-body-weight w-full px-2 py-1 has-hover:hover:bg-grey-100 rounded"
          @click.native="closeMenu"
        >
          Collections
        </NuxtLink>
      </li>
      <li class="flex">
        <!-- <button
          v-if="$strapi.user"
          class="focus:outline-none text-left font-bold-body-weight w-full px-2 py-1 has-hover:hover:bg-grey-100 rounded"
          @click="logout"
        >
          Logout
        </button> -->
        <button
          class="focus:outline-none text-left font-bold-body-weight w-full px-2 py-1 has-hover:hover:bg-grey-100 rounded"
          @click="login"
        >
          Login
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, useNuxtApp, useCookie } from '#imports'
const { getProviderAuthenticationUrl } = useStrapiAuth()
const { $gsap } = useNuxtApp()

const el = ref(null)

const emit = defineEmits(['close-menu'])

function login() {
  closeMenu()
  // TODO
  // this.$strapi.$cookies.set(
  //   'redirect',
  //   this.redirect || this.$route.fullPath
  // )
  // window.location = `${this.$config.strapiURL}/connect/github`

  window.location = getProviderAuthenticationUrl('github')
}
async function logout() {
  try {
    await this.$strapi.logout()
    closeMenu()
  } catch (e) {}
}
function openMenuAnimation() {
  $gsap.set(el.value, {
    transformOrigin: 'top right'
  })
  $gsap.fromTo(
    el.value,
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
      duration: 0.3,
      ease: 'elastic.out(1.9, 1.7)'
      // ease: 'expo.outIn'
    }
  )
}
function closeMenu() {
  $gsap.to(el.value, {
    // borderRadius: '20px',
    opacity: 0,
    scale: 0.75,
    y: -15,
    duration: 0.2,
    ease: 'none',
    onComplete: () => {
      emit('close-menu')
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    openMenuAnimation()
  }, 16)
})
</script>
