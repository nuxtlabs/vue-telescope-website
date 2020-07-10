<template>
  <component :is="`${brand}Icon`" />
</template>

<script>
import BootstrapIcon from '@/assets/brands/bootstrap.svg?inline'
import BootstrapVueIcon from '@/assets/brands/bootstrap-vue.svg?inline'
import BuefyIcon from '@/assets/brands/buefy.svg?inline'
import ElementUiIcon from '@/assets/brands/element-ui.svg?inline'
import GridsomeIcon from '@/assets/brands/gridsome.svg?inline'
import InklineIcon from '@/assets/brands/inkline.svg?inline'
import NuxtjsIcon from '@/assets/brands/nuxtjs.svg?inline'
import QuasarIcon from '@/assets/brands/quasar.svg?inline'
import TailwindCssIcon from '@/assets/brands/tailwind-css.svg?inline'
import VueIcon from '@/assets/brands/vue.svg?inline'
import VuepressIcon from '@/assets/brands/vuepress.svg?inline'
import VuetifyIcon from '@/assets/brands/vuetify.svg?inline'

export default {
  components: {
    BootstrapIcon,
    BootstrapVueIcon,
    BuefyIcon,
    ElementUiIcon,
    GridsomeIcon,
    InklineIcon,
    NuxtjsIcon,
    QuasarIcon,
    TailwindCssIcon,
    VueIcon,
    VuepressIcon,
    VuetifyIcon
  },
  props: {
    brand: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
