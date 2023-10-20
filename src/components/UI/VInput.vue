<template>
  <input
    :name="inputName"
    v-model="value"
    class="input"
  />
</template>

<script setup>
import {computed} from 'vue'
defineOptions({
  name: 'VInput',
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  inputName: String,
  modelValue: String,
})
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
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
