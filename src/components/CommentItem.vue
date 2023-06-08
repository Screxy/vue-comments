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
      <my-button class="item__button" @click="showDialog">Ответить</my-button>
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
      return 15 * this.comment.nest;
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

<style scoped>
.item {
  padding: 15px;
  border: 3px solid teal;
  margin: 0;
  margin-top: 10px;
  list-style: none;
  border-radius: 12px;
}

.item_green {
  background-color: rgba(0, 255, 128, 0.322);
}
.item_red {
  background-color: rgba(255, 0, 0, 0.322);
}
.item__author {
  font-size: 2rem;
}
.item__text {
  font-size: 1.6em;
  word-break: break-word;
}
.item__bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.item__button {
  font-size: 1.4rem;
}
.item__replies {
  margin-left: auto;
  font-size: 1.4rem;
  line-height: 1;
}
.item__replies + .item__date {
  margin-left: 15px;
}
.item__date {
  margin-left: auto;
  font-size: 1.4rem;
  line-height: 1;
}
</style>
