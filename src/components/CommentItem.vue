<template>
  <li class="item" :style="{'margin-left':nestMargin+'px', backgroundColor: colorReaction}">
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
    <p>
      {{ comment.comment.reaction }}
    </p>
    <p>
      {{ comment.reactionSum }}
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
    },
    colorReaction(){
      if (this.comment.reactionSum > 0){
        return 'green'
      }
      else if (this.comment.reactionSum < 0){
        return 'red'
      }
      return 'none'
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
