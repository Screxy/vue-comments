<template>
  <h2>Список комментариев {{ comments.length }}</h2>
  <ul class="comments">
    <CommentItem v-for="comment in comments" :comment="comment" class="comments__item" />
  </ul>
</template>

<script>
import CommentItem from './CommentItem.vue';

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  components: { CommentItem },
};
</script>

<style scoped>

</style>
