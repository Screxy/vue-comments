<template>
  <section class="main">
    <div class="main__wrapper">
      <h1 class="main__title">Лаба которая стала этим</h1>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/function' as *;

.main__wrapper {
  @include wrapper();
}
.main__title {
  @include title();
  margin-top: 2rem;
}
</style>
