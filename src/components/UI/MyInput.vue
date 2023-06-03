<template>
  <input
    :type="inputType"
    :name="inputName"
    :value="modelValue"
    @input="updateInput"
    class="input"
  />
</template>

<script>

export default {
  name: 'my-input',
  props: {
    inputType: String,
    inputName: String,
    modelValue: String,
  },
  methods: {
    updateInput(event){
        this.$emit('update:modelValue', event.target.value)
    }
  },
};
</script>

<style scoped>
.input {
  resize: none;
  width: 100%;
  border: 2px solid teal;
  padding: 10px 15px;
}
</style>
