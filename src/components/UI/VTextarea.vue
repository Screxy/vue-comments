<template>
  <textarea
    name="textareaName"
    class="textarea"
    :value="modelValue"
    @input="updateTextarea"
  ></textarea>
</template>

<script>
export default {
  name: 'v-textarea',
  props: {
    textareaName: String,
    modelValue: String,
  },
  methods: {
    updateTextarea(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;
.textarea {
  font-size: 1.2rem;
  resize: none;
  width: 100%;
  border: 2px solid color(primaryTitleColor);
  padding: 10px 15px;
  &:focus {
    box-shadow: 0px 0px 7px 3px #757575;
  }
}
</style>
