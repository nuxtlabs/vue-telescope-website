<template>
  <div class="flex items-center">
    <input
      :id="id"
      class="w-4 h-4 mr-2"
      type="radio"
      :checked="checked"
      @change="$emit('input', checked)"
    />
    <label :for="id" class="text-sm leading-sm">
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: 'Default label'
    }
  }
}
</script>

<style></style>
