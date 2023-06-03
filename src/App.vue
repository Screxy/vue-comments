<template>
  <header></header>
  <main>
    <div class="wrapper">
      <CommentForm @create="createComment" :commentsLenght="commentsLenght"/>
      <CommentList :comments="comments" />
    </div>
  </main>
  <footer></footer>
</template>
<script>
import CommentList from './components/CommentList.vue';
import CommentForm from './components/CommentForm.vue';

export default {
  data() {
    return {
      comments: [
        {
          id: 1,
          author: 'Screxy',
          text: 'Пост пушка! Рад, что нашел тебя!',
          reaction: 1,
          parentId: 0,
          createdAt: '2023-06-03T12:42:22.398Z',
        },
        {
          id: 2,
          author: 'Nikolya',
          text: 'Не согласен',
          reaction: -1,
          parentId: 1,
          createdAt: '2023-06-03T12:42:22.398Z',
        },
        {
          id: 3,
          author: 'Petya',
          text: 'Пост объективно не очень',
          reaction: -1,
          parentId: 1,
          createdAt: '2023-06-03T12:42:22.398Z',
        },
        {
          id: 4,
          author: 'Slavaver',
          text: 'Пост средний, надо переделать',
          reaction: 0,
          parentId: 0,
          createdAt: '2023-06-03T12:42:22.398Z',
        },
        {
          id: 5,
          author: 'Misha',
          text: 'согласен',
          reaction: 1,
          parentId: 4,
          createdAt: '2023-06-03T12:42:22.398Z',
        },
        {
          id: 6,
          author: 'Olya',
          text: 'вы правы',
          reaction: 1,
          parentId: 4,
          createdAt: '2023-06-03T12:42:22.398Z',
        },
      ],
    };
  },
  methods: {
    createComment(comment) {
      this.comments.push(comment);
    },
  },
  computed: {
    commentsLenght(){
        return this.comments.length
    }
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

.wrapper {
  padding: 20px;
}
</style>
