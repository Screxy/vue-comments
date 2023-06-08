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
  name: 'my-textarea',
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

<style scoped>
.textarea {
  resize: none;
  width: 100%;
  border: 2px solid teal;
  padding: 10px 15px;
  /* min-height: 150px; */
}
</style>
