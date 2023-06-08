<template>
  <div class="dialog" v-if="show" @click="hideDialog" @keyup.esc="asdasdas">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    asdasdas() {
      console.log('gwgw');
    },
    hideDialog() {
      this.$emit('update:show', false);
    },
  //   hideDialogEsc(event) {
  //     console.log(event.key, 'sdfsdfsdf');
  //     if(event.key === 'Escape') this.$emit('update:show', false);
  //   },
  // },
  // mounted() {
  //   window.addEventListener('keyup', this.hideDialogEsc);
  // },
  // destroyed() {
  //   window.removeEventListener('keyup', this.hideDialogEsc);
  },
};
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
}
.dialog__content {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
}
</style>
