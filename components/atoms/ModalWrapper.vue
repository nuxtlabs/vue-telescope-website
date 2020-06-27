<template>
  <div class="modal-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(18px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
