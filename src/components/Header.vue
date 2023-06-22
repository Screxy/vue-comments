<template>
  <header class="header">
    <div class="header__wrapper">
      <NavBar />
    </div>
  </header>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: { NavBar },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;
.header {
  margin-top: 1.5rem;
}
.header__wrapper {
  @include wrapper();
}
</style>
