<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;

.button {
  padding: 10px;
  color: color(secondDescColor);
  background: color(primaryTitleColor);
  border: 1px solid color(primaryTitleColor);
  border-radius: 30px;
  @include media(min, md) {
    padding: 15px;
  }
  &:focus {
    box-shadow: 0px 0px 7px 3px #757575;
  }
}
</style>
