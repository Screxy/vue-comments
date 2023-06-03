<template>
  <ul class="comments">
    <CommentItem
      v-for="comment in sortByNesting"
      :comment="comment"
      key="comment.comment.id"
      class="comments__item"
    />
  </ul>
</template>

<script>
import CommentItem from './CommentItem.vue';

export default {
  components: { CommentItem },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sortByNesting() {
      let sortedComments = [];
      this.comments.forEach((comment) => {
        if (comment.parentId === 0) {
          sortedComments.push({comment: comment, nest:0});
          this.haveChild(comment,1, this.comments, sortedComments);
        }
      });
      console.log(sortedComments);
      return sortedComments;
    },
  },
  methods: {
    haveChild(parent,nest , arr1, arr2) {
      arr1.forEach((element) => {
        if (parent.id === element.parentId) {
          arr2.push({comment: element, nest:nest});
          this.haveChild(element,nest+1, arr1, arr2);
        }
      });
    },
  },
};
</script>

<style scoped></style>
