<template>
  <main>
    <section class="comments">
      <div class="comments__wrapper">
        <h1 class="comments__title">Рекурсивные комментарии</h1>
        <div class="comments__switch">
          <span class="comments__text"
            >Новые комментарии в реальном времени</span
          >
          <VSwitch class="comments__input" v-model="switchChecked" />
        </div>
        <VButton @click="showDialog" class="comments__button">
          Написать комментарий
        </VButton>
        <VDialog v-model:show="dialogVisible">
          <CommentForm
            @create="postComments"
            :parentCommentId="parentCommentId"
            :visible="dialogVisible"
            :sending="isAppSending"
            class="comments__form"
          />
        </VDialog>
        <h2 class="comments__subtitle">
          Список комментариев ({{ commentsLenght }})
        </h2>
        <RecursiveCommentList
          :comments="comments"
          class="comments__section"
          @reply="showReplyDialog"
        />
      </div>
    </section>
    <Toasts v-model:show="toastsVisible" :content="toastsContent" />
  </main>
</template>
<script setup>
import RecursiveCommentList from '@/components/RecursiveCommentList.vue'
import CommentForm from '@/components/CommentForm.vue'
import Toasts from '@/components/Toasts.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useComments } from '@/hooks/useComments'
const { comments, postComments, addComment } = useComments()
const parentCommentId = ref(null)
const toastsContent = ref({ status: '', message: '' })
const toastsVisible = ref(false)
const dialogVisible = ref(false)
const evtSource = ref(null)
const switchChecked = ref(true)
const isAppSending = ref(false)
function showReplyDialog(parentId) {
  parentCommentId.value = parentId
  dialogVisible.value = true
}
function showDialog() {
  parentCommentId.value = null
  dialogVisible.value = true
}
function openConnection() {
  evtSource.value = new EventSource('http://194.67.93.117:80/comments/stream')
  evtSource.value.onmessage = addComment
}
function closeConnection() {
  if (evtSource.value) {
    evtSource.value.close()
    evtSource.value = null
  }
}
function serverSentEvent() {
  if (!switchChecked.value) {
    closeConnection()
  } else {
    openConnection()
  }
}

const commentsLenght = computed(() => comments.value.length)
watch(switchChecked, serverSentEvent)
onMounted(() => openConnection())
</script>
<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;

.comments {
  padding-bottom: 20px;
}
.comments__wrapper {
  @include wrapper(block);
}
.comments__title {
  @include title();
  margin-top: 2rem;
}
.comments__switch {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.comments__text {
  @include subTitle();
}
.comments__subtitle {
  @include subTitle();
  margin-top: 15px;
}
.comments__button {
  margin-top: 15px;
  @include secondTitle();
}
</style>
