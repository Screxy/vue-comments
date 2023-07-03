<template>
  <input
    :name="inputName"
    :value="modelValue"
    @input="updateInput"
    class="input"
  />
</template>

<script>
export default {
  name: 'v-input',
  props: {
    inputName: String,
    modelValue: String,
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;
.input {
  font-size: 1.2rem;
  width: 100%;
  border: 2px solid color(primaryTitleColor);
  padding: 10px 15px;
  &:focus {
    box-shadow: 0px 0px 7px 3px #757575;
  }
}
</style>
