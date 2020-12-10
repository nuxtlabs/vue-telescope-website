<template>
  <div>
    <div v-for="{ name, showcases, id } in groups" :key="id" class="mb-4">
      <div>{{ name }}</div>
      <div>Showcases count: {{ showcases.length }}</div>
      <button>delete group</button>
    </div>
    <div v-if="!groups || !groups.length">
      <button>Create group</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    groups: {
      type: Array,
      default: null
    }
  }
}
</script>

<style></style>
