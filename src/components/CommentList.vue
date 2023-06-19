<template>
  <ul class="section" v-if="comments.length > 0">
    <CommentItem
      @showDialog="changeParentCommentId"
      v-for="comment in reactionAndChildSum"
      :comment="comment"
      key="comment.id"
      class="section__item"
    />
  </ul>
  <p class="section__text" v-else>Комментариев не найдено</p>
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
          let commentChanged = {...comment};
          commentChanged.nest = 0;
          commentChanged.reactionSum = 0;
          commentChanged.childs = 0;
          console.log(commentChanged);
          sortedComments.push(
            commentChanged
          );
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
          if (parrent.id === child.parentId) {
            parrent.childs++;
            parrent.reactionSum += child.reaction;
          }
        }
      }
      return arr;
    },
  },
  methods: {
    haveChild(parent, nest, arr1, arr2) {
      if (arr1.length === arr2.length) return;
      arr1.forEach((originalElement) => {
        let element = {...originalElement}
        if (parent.id === element.parentId) {
          console.log(element);
          element.nest = nest;
          element.reactionSum = 0;
          element.childs = 0;
          arr2.push(element);
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
@use '@/assets/scss/mixin' as *;
.section__item {
  margin-top: 15px;
}
.section__text {
  @include subTitle();
}
</style>
