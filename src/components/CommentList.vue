<template>
  <ul class="comments" v-if="comments.length > 0">
    <CommentItem
      @showDialog="changeParentCommentId"
      v-for="comment in reactionSum"
      :comment="comment"
      key="comment.comment.id"
      class="comments__item"

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
  data(){
    return{
      commentList: this.comments
    }
  },
  computed: {
    sortByNesting() {
      let sortedComments = [];
      this.commentList.forEach((comment) => {
        if (comment.parentId === 0) {
          sortedComments.push({ comment: comment, nest: 0, reactionSum: 0 });
          this.haveChild(comment, 1, this.commentList, sortedComments);
        }
      });
      return sortedComments;
    },
    reactionSum() {
      let arr = this.sortByNesting;
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const parrent = arr[i];
          const child = arr[j];
          if (parrent.comment.id === child.comment.parentId) {
            parrent.reactionSum += child.comment.reaction;
          }
        }
      }
      return arr;
    },
  },
  methods: {
    haveChild(parent, nest, arr1, arr2) {
      arr1.forEach((element) => {
        if (parent.id === element.parentId) {
          arr2.push({ comment: element, nest: nest });
          this.haveChild(element, nest + 1, arr1, arr2);
        }
      });
    },
    changeParentCommentId(parentCommentId){
      this.$emit('reply', parentCommentId)
    }
  },
};
</script>

<style scoped></style>
