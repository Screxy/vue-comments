<template>
  <main>
    <section class="comments">
      <div class="comments__wrapper">
        <h1 class="comments__title">Страница комментариев</h1>
        <div class="comments__switch">
          <span class="comments__text"
            >Новые комментарии в реальном времени</span
          >
          <my-switch
            class="comments__input"
            :checked="switchChecked"
            @check="streamComment"
          />
        </div>
        <my-button @click="showDialog" class="comments__button">
          Написать комментарий
        </my-button>
        <my-dialog v-model:show="dialogVisible">
          <CommentForm
            @create="postComments"
            :parentCommentId="parentCommentId"
            class="comment__form"
          />
        </my-dialog>
        <h2 class="comments__subtitle">
          Список комментариев ({{ comments.length }})
        </h2>
        <CommentList
          :comments="comments"
          class="comments__section"
          @reply="showReplyDialog"
        />
      </div>
    </section>
  </main>
</template>
<script>
import CommentList from './components/CommentList.vue';
import CommentForm from './components/CommentForm.vue';
import axios from 'axios';

export default {
  data() {
    return {
      parentCommentId: null,
      comments: [
        // {
        //   id: 1,
        //   author: 'Screxy',
        //   text: 'Пост пушка! Рад, что нашел тебя!',
        //   reaction: 1,
        //   parentId: null,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 2,
        //   author: 'Nikolya',
        //   text: 'Не согласен',
        //   reaction: -1,
        //   parentId: 1,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 3,
        //   author: 'Petya',
        //   text: 'Пост объективно не очень',
        //   reaction: -1,
        //   parentId: 1,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 4,
        //   author: 'Slavaver',
        //   text: 'Пост средний, надо переделать',
        //   reaction: 0,
        //   parentId: null,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 5,
        //   author: 'Misha',
        //   text: 'согласен',
        //   reaction: 1,
        //   parentId: 4,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 6,
        //   author: 'Olya',
        //   text: 'вы правы',
        //   reaction: 1,
        //   parentId: 4,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
        // {
        //   id: 7,
        //   author: 'Olya',
        //   text: 'вы правы',
        //   reaction: 1,
        //   parentId: 1,
        //   createdAt: '2023-06-03T12:42:22.398Z',
        // },
      ],
      dialogVisible: false,
      evtSource: null,
      switchChecked: true,
    };
  },
  methods: {
    streamComment() {
      if (this.switchChecked === false) {
        this.switchChecked = true;
        return;
      }
      this.switchChecked = false;
    },
    addComment(comment) {
      this.comments.push(JSON.parse(comment.data));
    },
    showReplyDialog(parentCommentId) {
      this.parentCommentId = parentCommentId;
      this.dialogVisible = true;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchComments() {
      try {
        const response = await axios.get('http://194.67.93.117:80/comments');
        this.comments.length = 0;
        this.comments.push(...response.data.reverse());
      } catch (error) {
        console.log(error);
      }
    },
    async postComments(comment) {
      try {
        let url = 'http://194.67.93.117:80/comments';
        let commentbody = {
          author: comment.author,
          text: comment.text,
          reaction: comment.reaction,
          parentId: comment.parentId,
        };

        const response = await axios.post(url, commentbody, {
          headers: {
            'Content-Type': 'application/json',
            Username: 'Screxy',
          },
        });

        console.log(response.data);
        this.dialogVisible = false;
        this.parentCommentId = null;
      } catch (error) {
        console.log(error);
      }
    },
    openConnection() {
      this.evtSource = new EventSource(
        'http://194.67.93.117:80/comments/stream'
      );
      this.evtSource.onmessage = this.addComment;
    },
    closeConnection() {
      if (this.evtSource) {
        this.evtSource.close();
        this.evtSource = null;
      }
    },
    serverSentEvent() {
      if (!this.switchChecked) {
        this.closeConnection();
      } else {
        this.openConnection();
      }
    },
  },
  computed: {
    commentsLenght() {
      return this.comments.length;
    },
    parrentIdcheck() {
      if (this.dialogVisible === false) {
        this.parentCommentId = null;
      }
    },
  },
  watch: {
    switchChecked: 'serverSentEvent',
  },
  components: { CommentList, CommentForm },
  beforeMount() {
    this.fetchComments();
  },
  mounted() {
    this.openConnection();
  },
};
</script>
<style lang="scss">
@use '@/assets/scss/mixin' as *;
@use '@/assets/scss/function' as *;
@use '@/assets/scss/variables' as *;

html,
body,
body div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
figure,
footer,
header,
menu,
nav,
section,
time,
mark,
audio,
video,
details,
summary {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
  background: transparent;
  list-style: none;
}

article,
aside,
figure,
footer,
header,
nav,
section,
details,
summary {
  display: block;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
img,
object,
embed {
  max-width: 100%;
}

ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted #000;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
th {
  font-weight: bold;
  vertical-align: bottom;
}
td {
  font-weight: normal;
  vertical-align: top;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

pre {
  white-space: pre; /* CSS2 */
  white-space: pre-wrap; /* CSS 2.1 */
  white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
  word-wrap: break-word; /* IE */
}

input[type='radio'] {
  vertical-align: text-bottom;
}
input[type='checkbox'] {
  vertical-align: bottom;
}
.ie7 input[type='checkbox'] {
  vertical-align: baseline;
}
.ie6 input {
  vertical-align: text-bottom;
}

select,
input,
textarea {
  font: 99% sans-serif;
}

table {
  font-size: inherit;
  font: 100%;
}

small {
  font-size: 85%;
}

strong {
  font-weight: bold;
}

td,
td img {
  vertical-align: top;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
}
sup {
  top: -0.5em;
}
sub {
  bottom: -0.25em;
}

pre,
code,
kbd,
samp {
  font-family: monospace, sans-serif;
}

.clickable,
label,
input[type='button'],
input[type='submit'],
input[type='file'],
button {
  cursor: pointer;
}

button,
input,
select,
textarea {
  margin: 0;
}

button,
input[type='button'] {
  width: auto;
  overflow: visible;
}

.ie7 img {
  -ms-interpolation-mode: bicubic;
}
.clearfix:before,
.clearfix:after {
  content: '\0020';
  display: block;
  height: 0;
  overflow: hidden;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
}
html {
  font-size: 62.5%;
}
body {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
}
@font-face {
  font-family: 'Open Sans';
  src: url('@/assets/fonts/OpenSans-Bold.eot');
  src: url('@/assets/fonts/OpenSans-Bold.eot?#iefix')
      format('embedded-opentype'),
    url('@/assets/fonts/OpenSans-Bold.woff2') format('woff2'),
    url('@/assets/fonts/OpenSans-Bold.woff') format('woff'),
    url('@/assets/fonts/OpenSans-Bold.ttf') format('truetype'),
    url('@/assets/fonts/OpenSans-Bold.svg#OpenSans-Bold') format('svg');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Open Sans';
  src: url('@/assets/fonts/OpenSans-SemiBold.eot');
  src: url('@/assets/fonts/OpenSans-SemiBold.eot?#iefix')
      format('embedded-opentype'),
    url('@/assets/fonts/OpenSans-SemiBold.woff2') format('woff2'),
    url('@/assets/fonts/OpenSans-SemiBold.woff') format('woff'),
    url('@/assets/fonts/OpenSans-SemiBold.ttf') format('truetype'),
    url('@/assets/fonts/OpenSans-SemiBold.svg#OpenSans-SemiBold') format('svg');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Open Sans';
  src: url('@/assets/fonts/OpenSans-Regular.eot');
  src: url('@/assets/fonts/OpenSans-Regular.eot?#iefix')
      format('embedded-opentype'),
    url('@/assets/fonts/OpenSans-Regular.woff2') format('woff2'),
    url('@/assets/fonts/OpenSans-Regular.woff') format('woff'),
    url('@/assets/fonts/OpenSans-Regular.ttf') format('truetype'),
    url('@/assets/fonts/OpenSans-Regular.svg#OpenSans-Regular') format('svg');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
.comments__wrapper {
  @include wrapper(block);
}
.comments__title {
  @include title();
  margin-top: 40px;
}
.comments__switch {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.comments__text {
  @include subTitle();
}
.comments__subtitle {
  @include subTitle();
  margin-top: 15px;
}
.comments__button {
  margin-top: 15px;
  @include secondTitle();
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
