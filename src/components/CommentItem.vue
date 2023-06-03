<template>
  <li class="item" :style="{'margin-left':nestMargin+'px'}">
    <h3>
      {{ comment.comment.author }}
      {{ comment.comment.id }}
    </h3>
    <p>
      {{ comment.comment.text }}
    </p>
    <p>
      {{ comment.comment.createdAt }}
    </p>
    <my-button>Ответить</my-button>
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      typeof: Object,
      required: true,
    },
  },
  computed:{
    nestMargin(){
      return 15*this.comment.nest
    }
  },
};
</script>

<style scoped>
.item {
  padding: 15px;
  border: 3px solid teal;
  margin-top: 10px;
}
.child-item{
    margin-left: 15px;
}
</style>
