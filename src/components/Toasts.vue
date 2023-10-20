<template>
  <div class="toasts" v-if="show" :class="{ toasts_error: !contentStatus }">
    <button class="toasts__close" @click="hideToasts">x</button>
    <p class="toasts__header">{{ content.status }}</p>
    <p class="toasts__text">{{ content.message }}</p>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
const emit = defineEmits(['update:show'])
const props = defineProps({
  content: Object,
  show: {
    type: Boolean,
    default: false,
  },
})
const show = computed(() => props.show)
const contentStatus = computed(() => {
  if (props.content.status === 'Error') {
    return false
  }
  return true
})
function deferredClose() {
  setTimeout(() => {
    hideToasts()
  }, 3000)
}
function hideToasts() {
  emit('update:show', false)
}
watch(show, deferredClose)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixin' as *;
.toasts {
  padding: 1.5rem;
  position: fixed;
  border-radius: 10px;
  bottom: 50px;
  right: 50px;
  background-color: green;
  &_active {
    display: block;
  }
  &_hidden {
    animation: toastsHidden 0.3s forwards;
  }
  @include media(min, xl) {
    padding: 1rem;
    min-width: 15rem;
  }
}
@keyframes toastsHidden {
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
.toasts__header {
  @include subTitle();
  margin: 0;
  color: #ffffff;
}
.toasts__text {
  @include desc();
  color: #fff;
  margin: 0;
}
.toasts__close {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border: none;
  border-radius: 50px;
}
.toasts_error {
  background-color: red;
}
</style>
