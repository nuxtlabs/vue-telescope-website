<template>
  <div class="flex">
    <span class="mr-2">{{ text }}</span>
    <a :href="url"><LinkIcon class="w-4" /></a>
  </div>
</template>

<script>
import LinkIcon from '@/assets/icons/link.svg?inline'

export default {
  components: {
    LinkIcon
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
