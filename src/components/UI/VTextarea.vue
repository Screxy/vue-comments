<template>
  <textarea name="textareaName" class="textarea" v-model="value"></textarea>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({
  name: 'VTextarea',
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  textareaName: String,
  modelValue: String,
})
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
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
