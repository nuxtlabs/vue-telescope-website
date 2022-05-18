import { defineNuxtPlugin } from '#imports'
import vClickOutside from '@/directives/click-outside'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', vClickOutside)
})
