<template>
  <ul class="section" v-if="comments.length > 0">
    <RecursiveCommentItem
      @showDialog="changeParentCommentId"
      v-for="comment in nestedComments"
      :comment="comment"
      :childs="comment.childs"
      :nest="comment.nest"
      key="comment.id"
      class="section__item"
    />
  </ul>
  <p class="section-text" v-else>Комментариев не найдено</p>
</template>

<script>
import RecursiveCommentItem from '@/Components/RecursiveCommentItem.vue'

export default {
  components: { RecursiveCommentItem },
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  computed: {
    nestedComments() {
      let nestedComments = []
      this.comments.forEach((comment) => {
        if (comment.parentId === null || !comment.parentId) {
          let commentChanged = { ...comment }
          commentChanged.nest = 0
          commentChanged.childs = this.findChilds(
            commentChanged,
            this.comments,
            1
          )
          nestedComments.push(commentChanged)
        }
      })
      return nestedComments
    },
  },
  methods: {
    findChilds(parent, arr, nest) {
      let childs = arr.filter((comment) => comment.parentId === parent.id)
      if (childs.length === 0) return null
      childs.forEach((childComment) => {
        childComment.childs = this.findChilds(
          childComment,
          this.comments,
          nest + 1
        )
        childComment.nest = nest
      })
      return childs
    },
    changeParentCommentId(parentCommentId) {
      console.log(parentCommentId)
      this.$emit('reply', parentCommentId)
    },
  },
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
.section {
  margin-top: 1.5rem;
}
.section-text {
  @include subTitle();
}
</style>
