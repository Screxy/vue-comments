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

<script setup>
import { ref, computed } from 'vue'
import RecursiveCommentItem from '@/Components/RecursiveCommentItem.vue'
const emit = defineEmits(['reply'])
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
})
const comments = ref(props.comments)
const nestedComments = computed(() => {
  let nestedComments = []
  comments.value.forEach((comment) => {
    if (comment.parentId === null || !comment.parentId) {
      let commentChanged = { ...comment }
      commentChanged.nest = 0
      commentChanged.childs = findChilds(commentChanged, comments.value, 1)
      nestedComments.push(commentChanged)
    }
  })
  return nestedComments
})

function findChilds(parent, arr, nest) {
  let childs = arr.filter((comment) => comment.parentId === parent.id)
  if (childs.length === 0) return null
  childs.forEach((childComment) => {
    childComment.childs = findChilds(childComment, arr, nest + 1)
    childComment.nest = nest
  })
  return childs
}
function changeParentCommentId(parentCommentId) {
  emit('reply', parentCommentId)
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
