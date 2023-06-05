<template>
  <main>
    <div class="comments__wrapper">
      <h2>Страница комментариев</h2>
      <my-button @click="fetchComments">Получить комментарии</my-button>
      <my-button @click="showDialog" class="comments__button">
        Написать комментарий
      </my-button>
      <my-dialog v-model:show="dialogVisible">
        <CommentForm
          @create="createComment"
          :commentsLenght="commentsLenght"
          :parentCommentId="parentCommentId"
          class="comment__form"
        />
      </my-dialog>
      <h2 class="comments__title">Список комментариев {{ comments.length }}</h2>
      <CommentList
        :comments="reverse"
        class="comments__section"
        @reply="showReplyDialog"
      />
    </div>
  </main>
</template>
<script>
import CommentList from './components/CommentList.vue';
import CommentForm from './components/CommentForm.vue';
import axios from 'axios';

export default {
  data() {
    return {
      parentCommentId: null,
      comments: [
        // {
        //   id: 1,
        //   author: 'Screxy',
        //   text: 'Пост пушка! Рад, что нашел тебя!',
        //   reaction: 1,
        //   parentId: null,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 2,
        //   author: 'Nikolya',
        //   text: 'Не согласен',
        //   reaction: -1,
        //   parentId: 1,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 3,
        //   author: 'Petya',
        //   text: 'Пост объективно не очень',
        //   reaction: -1,
        //   parentId: 1,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 4,
        //   author: 'Slavaver',
        //   text: 'Пост средний, надо переделать',
        //   reaction: 0,
        //   parentId: null,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 5,
        //   author: 'Misha',
        //   text: 'согласен',
        //   reaction: 1,
        //   parentId: 4,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 6,
        //   author: 'Olya',
        //   text: 'вы правы',
        //   reaction: 1,
        //   parentId: 4,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 7,
        //   author: 'Olya',
        //   text: 'вы правы',
        //   reaction: 1,
        //   parentId: 1,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    createComment(comment) {
      this.comments.push(comment);
      this.dialogVisible = false;
      this.parentCommentId = null;
    },
    showReplyDialog(parentCommentId) {
      this.parentCommentId = parentCommentId;
      this.dialogVisible = true;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchComments() {
      try {
        const response = await axios.get('http://194.67.93.117:80/comments');
        console.log(response);
        this.comments.length = 0;
        this.comments.push(...response.data);
      } catch (error) {
        alert('ошибка');
      }
    },
  },
  computed: {
    commentsLenght() {
      return this.comments.length;
    },
    reverse() {
      return this.comments.reverse();
    },
  },
  components: { CommentList, CommentForm },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.comments__wrapper {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}
.comments__button {
  margin-top: 15px;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
