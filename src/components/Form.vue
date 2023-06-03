<template>
    <form method="post" class="form">
        <label class="form__label">
            <span>Введите имя</span>
            <input v-model="formData.author" class="form__input" type="text" name="author">
        </label>
        <label class="form__label">
            <span>Введите комментарий</span>
            <textarea v-model="formData.text" class="form__input" name="text"></textarea>
        </label>
        <label class="form__label">
            <input v-model="formData.reaction" type="radio" name="reaction" value="1" class="form__radio">
            <span>Like</span>
        </label>
        <label class="form__label">
            <input v-model="formData.reaction" type="radio" required name="reaction" value="0" class="form__radio">
            <span> Neutral </span>
        </label>
        <label class="form__label">
            <input v-model="formData.reaction" type="radio" name="reaction" value="-1" class="form__radio">
            <span>Dislike</span>
        </label>
        <button @click.prevent="addComment" class="form__button">Отправить</button>
    </form>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
}

.form__label {
    margin-top: 15px;
}

.form__input {
    resize: none;
    width: 100%;
    border: 2px solid teal;
    padding: 10px 15px;
}

.form__button {
    margin-top: 15px;
    align-self: flex-end;
    padding: 15px;
    background: none;
    border: 2px solid teal;
}
</style>