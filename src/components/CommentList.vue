<template>
  <ul class="section" v-if="comments.length > 0">
    <CommentItem
      @showDialog="changeParentCommentId"
      v-for="comment in reactionAndChildSum"
      :comment="comment"
      :key="comment.id"
      class="section__item"
    />
  </ul>
  <p class="section-text" v-else>Комментариев не найдено</p>
</template>

<script setup>
import CommentItem from './CommentItem.vue'
import {computed} from 'vue';
const emit = defineEmits(['reply'])
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
})
const sortByNesting = computed(() => {
  let sortedComments = []
  props.comments.forEach((comment) => {
    if (comment.parentId === null || !comment.parentId) {
      let commentChanged = { ...comment }
      commentChanged.nest = 0
      commentChanged.reactionSum = 0
      commentChanged.childs = 0
      sortedComments.push(commentChanged)
      haveChild(comment, 1, props.comments, sortedComments)
    }
  })
  return sortedComments
})
const reactionAndChildSum = computed(() => {
  let arr = sortByNesting.value
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const parrent = arr[i]
      const child = arr[j]
      if (parrent.id === child.parentId) {
        parrent.childs++
        parrent.reactionSum += child.reaction
      }
    }
  }
  return arr
})
function haveChild(parent, nest, arr1, arr2) {
  if (arr1.length === arr2.length) return
  arr1.forEach((originalElement) => {
    let element = { ...originalElement }
    if (parent.id === element.parentId) {
      element.nest = nest
      element.reactionSum = 0
      element.childs = 0
      arr2.push(element)
      haveChild(element, nest + 1, arr1, arr2)
    }
  })
}
function changeParentCommentId(parentCommentId) {
    emit('reply', parentCommentId)
}
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
.section__item {
  margin-top: 15px;
}
.section-text {
  @include subTitle();
}
</style>
