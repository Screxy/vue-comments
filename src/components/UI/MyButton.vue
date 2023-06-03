<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
    name: 'my-button'
};
</script>

<style scoped>
.button {
  padding: 15px;
  background: none;
  border: 2px solid teal;
  border-radius: 10px;
}
</style>
