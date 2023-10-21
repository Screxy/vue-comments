<template>
  <li
    class="item"
    :style="{
      'margin-left': nestMargin + 'px',
    }"
    :class="colorReaction"
  >
    <p class="item__author">
      {{ comment.author }}
    </p>
    <p class="item__text">
      {{ comment.text }}
    </p>
    <div class="item__bottom">
      <VButton class="item__button" @click="showDialog"> Ответить</VButton>
      <span class="item__replies" v-if="comment.childs"
        ><svg
          class="item__svg"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          viewBox="0 0 256 256"
          style="enable-background: new 0 0 256 256"
          xml:space="preserve"
        >
          <path
            style="fill: #6770e6"
            d="M95 94H16C7.163 94 0 86.837 0 78s7.163-16 16-16h79v32z"
          />
          <path
            d="M16 62C7.163 62 0 69.163 0 78c0 1.026.106 2.027.291 3C1.696 73.599 8.19 68 16 68h79v-6H16z"
            style="fill: #858eff"
          />
          <path
            style="fill: #6770e6"
            d="M95 144H26c-8.837 0-16-7.163-16-16s7.163-16 16-16h69v32zM95 194H46c-8.837 0-16-7.163-16-16s7.163-16 16-16h49v32z"
          />
          <path
            d="M30.291 175a16.035 16.035 0 0 0-.291 3c0 8.837 7.163 16 16 16h49v-6H46c-7.81 0-14.304-5.599-15.709-13z"
            style="fill: #5861c7"
          />
          <path
            d="M240 194H88c-8.837 0-16-7.163-16-16V78c0-8.837 7.163-16 16-16h152c8.837 0 16 7.163 16 16v100c0 8.837-7.163 16-16 16z"
            style="fill: #69ebfc"
          />
          <path
            style="fill: #5fd4e3"
            d="M240 187H88c-8.837 0-16-7.163-16-16v7c0 8.837 7.163 16 16 16h152c8.837 0 16-7.163 16-16v-7c0 8.837-7.163 16-16 16z"
          />
          <path
            d="M240 62H88c-8.837 0-16 7.163-16 16v6c0-8.837 7.163-16 16-16h152c8.837 0 16 7.163 16 16v-6c0-8.837-7.163-16-16-16z"
            style="fill: #a1f1fc"
          />
          <path
            style="fill: #5fd4e3"
            d="M172.397 153.197a12.437 12.437 0 0 1-16.794 0L72 76.691v14.735l75.73 69.302 7.922 7.217a12.42 12.42 0 0 0 15.87.128l7.928-7.21 76.368-69.886c.061-.082.121-.169.181-.252V79.026c0-.744-.064-1.472-.157-2.192l-83.445 76.363z"
          />
        </svg>
        {{ comment.childs }}
      </span>
      <time class="item__date">
        {{ convertDate }}
      </time>
    </div>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
const emit = defineEmits(['showDialog'])
const props = defineProps({
  comment: {
    typeof: Object,
    required: true,
  },
})
const date = ref(props.comment.createdAt)
const nestMargin = computed(() => {
  return Math.min(15 * props.comment.nest, 15 * 5)
})
const colorReaction = computed(() => {
  if (props.comment.reactionSum > 0) {
    return 'item_green'
  } else if (props.comment.reactionSum < 0) {
    return 'item_red'
  }
  return
})
const convertDate = computed(() => {
  return new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(Date.parse(date.value))
})

function showDialog() {
  emit('showDialog', props.comment.id)
}
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
  transition: box-shadow 0.8s linear;
  @include media(min, md) {
    padding: 15px;
  }
  &:hover {
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
  word-break: break-word;
}
.item__text {
  margin-top: 1rem;
  font-size: 1.6em;
  word-break: break-word;
}
.item__svg {
  height: 2rem;
}
.item__bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.item__button {
  font-size: 1.2rem;
  font-weight: 600;
  @include media(min, md) {
    font-size: 1.2rem;
  }
}
.item__replies {
  margin-left: auto;
  font-size: 1.4rem;
  line-height: 1;
  display: flex;
  align-items: center;
  gap: 5px;
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
