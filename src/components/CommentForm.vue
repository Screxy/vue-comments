<template>
  <form method="post" class="form" @submit.prevent="createComment">
    <label class="form__label">
      <span class="form__text">Введите ваше имя</span>
      <my-input
        v-model.trim="formData.author"
        class="form__input"
        inputType="text"
        inputName="author"
        placeholder="Ваше имя"
        required
      />
    </label>
    <label class="form__label">
      <span class="visually-hidden">Введите текст комментарий</span>
      <my-textarea
        v-model="formData.text"
        class="form__input"
        textareaName="text"
        placeholder="Текст комментария"
        rows="7"
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
      <span class="form__text">👍</span>
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
      <span class="form__text">😶</span>
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
      <span class="form__text">👎</span>
    </label>
    <my-button class="form__button" >
      Отправить
    </my-button>
  </form>
</template>

<script>
export default {
  props: {
    parentCommentId:{
      type: Number,
      defualt: null  
    }
  },
  data() {
    return {
      formData: {
        author: '',
        text: '',
        reaction: 0,
        parentId: null,
      },
    };
  },
  methods: {
    createComment() {
      this.formData = {
        author: this.formData.author,
        text: this.formData.text,
        reaction: +this.formData.reaction,
        parentId: this.parentCommentId,
      };
      this.$emit('create', this.formData);
      this.formData = {
        author: '',
        text: '',
        reaction: 0,
        parentId: null,
      }; // сделать нормальное обнуление
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/mixin' as *;
.form {
  display: flex;
  flex-direction: column;
}

.form__label {
  margin-top: 15px;
}
.form__text{
  font-size: 1.4rem;
  font-weight: 600;
}
.form__text + .form__input{
  margin-top: 7px;
}
.form__radio {
  width: 0;
  height: 0;
}
.form__radio + .form__text{
  font-size: 2rem;
}
.form__radio:checked + span {
  border-bottom: 2px solid color(primaryTitleColor);
  opacity: 1;
  transition: all .3s linear;
}
.form__radio + span{
  opacity: .5;
}
.form__button {
  margin-top: 15px;
  align-self: flex-end;
}
</style>
