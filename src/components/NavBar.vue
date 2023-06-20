<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__item">
        <router-link to="/" class="nav__link">Главная</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/About" class="nav__link">О проекте</router-link>
      </li>
      <li class="nav__item">
        <router-link to="/Comments" class="nav__link">Комментарии</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav{
    border-radius: 15px;
    border: 2px solid red;
}
.nav__list{
    display: flex;
    justify-content: space-evenly;
}
</style>
