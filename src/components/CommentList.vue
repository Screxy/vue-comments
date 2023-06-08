<template>
  <ul class="section" v-if="comments.length > 0">
    <CommentItem
      @showDialog="changeParentCommentId"
      v-for="comment in reactionAndChildSum"
      :comment="comment"
      key="comment.comment.id"
      class="section__item"
    />
  </ul>
  <h2 v-else>Комментариев не найдено</h2>
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
        if (comment.parentId === null || !comment.parentId) {
          sortedComments.push({
            comment: comment,
            nest: 0,
            reactionSum: 0,
            childs: 0,
          });
          this.haveChild(comment, 1, this.comments, sortedComments);
        }
      });
      return sortedComments;
    },
    reactionAndChildSum() {
      let arr = this.sortByNesting;
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const parrent = arr[i];
          const child = arr[j];
          if (parrent.comment.id === child.comment.parentId) {
            parrent.childs++;
            parrent.reactionSum += child.comment.reaction;
          }
        }
      }
      return arr;
    },
  },
  methods: {
    haveChild(parent, nest, arr1, arr2) {
      if (arr1.length === arr2.length) return;
      arr1.forEach((element) => {
        if (parent.id === element.parentId) {
          arr2.push({
            comment: element,
            nest: nest,
            reactionSum: 0,
            childs: 0,
          });
          this.haveChild(element, nest + 1, arr1, arr2);
        }
      });
    },
    changeParentCommentId(parentCommentId) {
      this.$emit('reply', parentCommentId);
    },
  },
};
</script>

<style scoped lang="scss">
.section__item{
  margin-top: 15px
}
</style>
