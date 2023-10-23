import { ref } from 'vue'
import axios from 'axios'
export function useComments() {
  const comments = ref([])
  function addComment(comment) {
    comments.value.push(JSON.parse(comment.data))
  }
  async function fetchComments() {
    try {
      const response = await axios.get('http://194.67.93.117:80/comments')
      comments.value.length = 0
      comments.value.push(...response.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }
  async function postComments(comment) {
    try {
      isAppSending.value = true
      let url = 'http://194.67.93.117:80/comments'
      let commentbody = {
        author: comment.author,
        text: comment.text,
        reaction: comment.reaction,
        parentId: comment.parentId,
      }

      const response = await axios.post(url, commentbody, {
        headers: {
          'Content-Type': 'application/json',
          Username: 'Screxy',
        },
      })

      console.log(response.data)
      toastsContent.value = response.data
      toastsVisible.value = true
      dialogVisible.value = false
      parentCommentId.value = null
    } catch (error) {
      console.log(error.message)
      toastsContent.value = { status: 'Error', message: error.message }
      toastsVisible.value = true
    }
    isAppSending.value = false
  }
  fetchComments()
  return {
    postComments,
    comments,
    addComment,
  }
}
