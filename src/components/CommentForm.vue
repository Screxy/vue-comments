<template>
  <form method="post" class="form" @submit.prevent="createComment">
    <h2>Написать комментарий</h2>
    <label class="form__label">
      <span class="visually-hidden">Введите имя</span>
      <my-input
        v-model.trim="formData.author"
        class="form__input"
        inputType="text"
        inputName="author"
        required
      />
    </label>
    <label class="form__label">
      <span class="visually-hidden">Введите комментарий</span>
      <my-textarea
        v-model="formData.text"
        class="form__input"
        textareaName="text"
        required
      ></my-textarea>
    </label>
    <label class="form__label">
      <span class="visually-hidden">Like</span>
      <input
        v-model="formData.reaction"
        type="radio"
        name="reaction"
        value="1"
        class="form__radio"
        required
      />
      <span>👍</span>
    </label>
    <label class="form__label">
      <span class="visually-hidden"> Neutral </span>
      <input
        v-model="formData.reaction"
        type="radio"
        required
        name="reaction"
        value="0"
        class="form__radio"
        checked
      />
      <span>😶</span>
    </label>
    <label class="form__label">
      <span class="visually-hidden">Dislike</span>
      <input
        v-model="formData.reaction"
        type="radio"
        name="reaction"
        value="-1"
        class="form__radio"
        required
      />
      <span>👎</span>
    </label>
    <my-button class="form__button" >
      Отправить
    </my-button>
  </form>
</template>

<script>
export default {
  props: {
    commentsLenght: {
      type: Number,
      required: true,
    },
    parentCommentId:{
      type: Number,
      defualt: 0  
    }
  },
  data() {
    return {
      formData: {
        author: '',
        text: '',
        reaction: 0,
        parentId: 0,
      },
    };
  },
  computed: {
    date() {
      return Date.now();
    },
    convertDate() {
      return new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(this.date);
    },
  },
  methods: {
    createComment() {
      this.formData = {
        id: this.commentsLenght + 1,
        author: this.formData.author,
        text: this.formData.text,
        reaction: +this.formData.reaction,
        parentId: this.parentCommentId,
        createdAt: this.convertDate,
      };
      this.$emit('create', this.formData);
      this.formData = {
        author: '',
        text: '',
        reaction: 0,
        parentId: 0,
      }; // сделать нормальное обнуление
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}

.form__label {
  margin-top: 15px;
}

.form__radio {
  width: 0;
  height: 0;
}
.form__radio:checked + span {
  border-bottom: 2px solid teal;
}

.form__button {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
