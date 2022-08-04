<template>
  <div
    ref="el"
    v-click-outside="closeMenu"
    class="bg-grey-50 rounded-lg opacity-0"
  >
    <div class="text-sm p-4">
      <span v-if="user">
        Hello,
        <span class="font-bold-body-weight">{{ user.username }}</span>
        👋
      </span>
      <span v-else>Hello, stranger 👀</span>
    </div>
    <hr class="text-grey-100">
    <ul class="text-base p-2">
      <li class="flex">
        <NuxtLink
          to="/lists"
          class="text-left font-bold-body-weight w-full px-2 py-1 has-hover:hover:bg-grey-100 rounded"
          @click.native="closeMenu"
        >
          Lists
        </NuxtLink>
      </li>
      <li class="flex">
        <button
          v-if="user"
          class="w-full px-2 py-1 text-left rounded focus:outline-none font-bold-body-weight has-hover:hover:bg-grey-100"
          @click="onLogout"
        >
          Logout
        </button>
        <button
          v-else
          class="w-full px-2 py-1 text-left rounded focus:outline-none font-bold-body-weight has-hover:hover:bg-grey-100"
          @click="login"
        >
          Login
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref, useNuxtApp, useCookie } from '#imports'
import type { User } from '~/types'

const { getProviderAuthenticationUrl, logout } = useStrapiAuth()
const user = useStrapiUser() as Ref<User>
const { $gsap } = useNuxtApp()
const route = useRoute()

const el = ref(null)

const emit = defineEmits(['close-menu'])

function login () {
  closeMenu()
  const redirect = useCookie('redirect')
  redirect.value = redirect.value || route.fullPath

  const location = getProviderAuthenticationUrl('github')
  window.location = location as unknown as Location
}

function onLogout () {
  try {
    logout()
    closeMenu()
  } catch (e) {}
}

function openMenuAnimation () {
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
function closeMenu () {
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
