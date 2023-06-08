<template>
  <li
    class="item"
    :style="{
      'margin-left': nestMargin + 'px',
    }"
    :class="colorReaction"
  >
    <p class="item__author">
      {{ comment.comment.author }}
    </p>
    <p class="item__text">
      {{ comment.comment.text }}
    </p>
    <div class="item__bottom">
      <my-button class="item__button" @click="showDialog">   Ответить</my-button>
      <span class="item__replies" v-if="comment.childs"
        >📩{{ comment.childs }}</span
      >
      <time class="item__date">
        {{ convertDate }}
      </time>
    </div>
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
  data() {
    return {
      date: this.comment.comment.createdAt,
    };
  },
  computed: {
    nestMargin() {
      
      return Math.min(15 * this.comment.nest,15*5);
    },
    colorReaction() {
      if (this.comment.reactionSum > 0) {
        return 'item_green';
      } else if (this.comment.reactionSum < 0) {
        return 'item_red';
      }
      return;
    },
    convertDate() {
      return new Intl.DateTimeFormat('ru', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(Date.parse(this.date));
    },
  },
  methods: {
    showDialog() {
      this.$emit('showDialog', this.comment.comment.id);
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;
.item {
  padding: 10px;
  margin: 0;
  list-style: none;
  border-radius: 12px;
  background-color: #e4e4e4;
  transition: box-shadow .8s linear;
  @include media(min,md){
    padding: 15px;
  }
  &:hover{
    box-shadow: 0px 0px 3px 0px #bebbbb;
  }
}

.item_green {
  background-color: rgba(0, 255, 128, 0.322);
}
.item_red {
  background-color: rgba(255, 0, 0, 0.322);
}
.item__author {
  font-size: 2rem;
  font-weight: 600;
}
.item__text {
  margin-top: 1rem;
  font-size: 1.6em;
  word-break: break-word;
}
.item__bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.item__button {
  font-size: 1.2rem;
  font-weight: 600;
  @include media(min,md){
    font-size: 1.2rem;
  }
}
.item__replies {
  margin-left: auto;
  font-size: 1.4rem;
  line-height: 1;
}
.item__replies + .item__date {
  @include media(min, xs) {
    margin-left: 15px;
  }
}
.item__date {
  margin-left: auto;
  font-size: 1.4rem;
  line-height: 1;
}
</style>
