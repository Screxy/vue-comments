<template>
    <ul class="list">
        <li class="list__item" v-for="comment in comments">
            <h3>
                {{ comment.author }}
            </h3>
            <p>
                {{ comment.text }}
            </p>
            <p>
                {{ comment.createdAt }}
            </p>
        </li>
    </ul>
</template>

<script>
    export default {
        props:{
            comments:{
                type: Array,
                required: true,
            }
        }
    }
</script>

<style  scoped>
.list__item {
    padding: 15px;
    border: 3px solid teal;
    margin-top: 10px;
}
</style>