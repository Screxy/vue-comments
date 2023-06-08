<template>
  <li
    class="item"
    :style="{
      'margin-left': nestMargin + 'px',
    }"
    :class="colorReaction"
  >
    <h3 class="item__author">
      {{ comment.comment.author }}
    </h3>
    <p class="item__text">
      {{ comment.comment.text }}
    </p>
    <p class="item__date">
      {{ convertDate }}
    </p>
    <span class="item__replies" v-if="comment.childs">📩{{ comment.childs }}</span>
    <my-button class="item__button" @click="showDialog">Ответить</my-button>
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
  margin-top: 10px;
}
.item__text{
  word-break: break-word;
}
.item_green {
  background-color: rgba(0, 255, 128, 0.322);
}
.item_red {
  background-color: rgba(255, 0, 0, 0.322);
}
</style>
