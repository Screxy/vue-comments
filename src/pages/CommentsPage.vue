<template>
  <main>
    <section class="comments">
      <div class="comments__wrapper">
        <h1 class="comments__title">Страница комментариев</h1>
        <div class="comments__switch">
          <span class="comments__text"
            >Новые комментарии в реальном времени</span
          >
          <my-switch
            class="comments__input"
            :checked="switchChecked"
            @check="streamComment"
          />
        </div>
        <my-button @click="showDialog" class="comments__button">
          Написать комментарий
        </my-button>
        <my-dialog v-model:show="dialogVisible">
          <CommentForm
            @create="postComments"
            :parentCommentId="parentCommentId"
            :visible="dialogVisible"
            class="comment__form"
          />
        </my-dialog>
        <h2 class="comments__subtitle">
          Список комментариев ({{ comments.length }})
        </h2>
        <CommentList
          :comments="comments"
          class="comments__section"
          @reply="showReplyDialog"
        />
      </div>
    </section>
    <Toasts v-model:show="toastsVisible" :content="toastsContent" />
  </main>
</template>
<script>
import CommentList from '@/components/CommentList.vue';
import CommentForm from '@/components/CommentForm.vue';
import Toasts from '@/components/Toasts.vue';
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
      toastsContent: { status: 'OK', message: 'osdogsdg' },
      toastsVisible: false,
      dialogVisible: false,
      evtSource: null,
      switchChecked: true,
    };
  },
  methods: {
    streamComment() {
      if (this.switchChecked === false) {
        this.switchChecked = true;
        return;
      }
      this.switchChecked = false;
    },
    addComment(comment) {
      this.comments.push(JSON.parse(comment.data));
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
        this.comments.length = 0;
        this.comments.push(...response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    },
    async postComments(comment) {
      try {
        let url = 'http://194.67.93.117:80/comments';
        let commentbody = {
          author: comment.author,
          text: comment.text,
          reaction: comment.reaction,
          parentId: comment.parentId,
        };

        const response = await axios.post(url, commentbody, {
          headers: {
            'Content-Type': 'application/json',
            Username: 'Screxy',
          },
        });

        console.log(response.data);
        this.toastsContent = response.data;
        this.toastsVisible = true;
        this.dialogVisible = false;
        this.parentCommentId = null;
      } catch (error) {
        console.log(error.message);
        this.toastsContent = { status: 'Error', message: error.message };
        this.toastsVisible = true;
      }
    },
    openConnection() {
      this.evtSource = new EventSource(
        'http://194.67.93.117:80/comments/stream'
      );
      this.evtSource.onmessage = this.addComment;
    },
    closeConnection() {
      if (this.evtSource) {
        this.evtSource.close();
        this.evtSource = null;
      }
    },
    serverSentEvent() {
      if (!this.switchChecked) {
        this.closeConnection();
      } else {
        this.openConnection();
      }
    },
    parrentIdcheck() {
      if (this.dialogVisible === false) {
        this.parentCommentId = null;
      }
    },
  },
  computed: {
    commentsLenght() {
      return this.comments.length;
    },
  },
  watch: {
    dialogVisible: 'parrentIdcheck',
    switchChecked: 'serverSentEvent',
  },
  components: { CommentList, CommentForm, Toasts},
  beforeMount() {
    this.fetchComments();
  },
  mounted() {
    this.openConnection();
  },
};
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
  margin-top: 40px;
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
