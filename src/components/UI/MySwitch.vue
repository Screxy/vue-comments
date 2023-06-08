<template>
  <label class="switch">
    <input type="checkbox" :checked="checked" @input="updateCheck" />
    <span class="switch"></span>
  </label>
</template>

<script>
export default {
  name: 'my-switch',
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

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  display: none;
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
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .switch {
  background-color: #2196f3;
}

input:focus + .switch {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .switch:before {
  transform: translateX(26px);
}
</style>
