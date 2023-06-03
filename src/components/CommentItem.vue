<template>
  <li class="item">
    <h3>
      {{ comment.author }}
    </h3>
    <p>
      {{ comment.text }}
    </p>
    <p>
      {{ comment.createdAt }}
    </p>
    <my-button>Ответить</my-button>
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      typeof: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 10px;
}
</style>
