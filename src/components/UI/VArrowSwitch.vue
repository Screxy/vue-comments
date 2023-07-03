<template>
  <label>
    <span class="visually-hidden">Переключатель</span>
    <input
      type="checkbox"
      :checked="checked"
      @input="updateCheck"
      class="visually-hidden"
    />
    <span class="switch"></span>
  </label>
</template>

<script>
export default {
  name: 'v-arrow-switch',
  props: {
    checked: Boolean,
  },
  methods: {
    updateCheck() {
      this.$emit('check');
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch {
  cursor: pointer;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.switch:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  border-left: 6px solid white;
  border-bottom: 6px solid white;
  left: 4px;
  bottom: 4px;
  background-color: transparent;
  transition: 0.4s;
  transform: rotate(-45deg);
}

input:checked + .switch {
  background-color: color(primaryTitleColor);
}

input:focus + .switch {
  box-shadow: 0 0 1px 2px color(primaryTitleColor);
}

input:checked + .switch:before {
  transform: rotate(135deg);
}
</style>
