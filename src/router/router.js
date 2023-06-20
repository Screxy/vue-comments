import Main from '@/pages/Main.vue'
import CommentsPage from '@/pages/CommentsPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/Comments',
    component: CommentsPage,
  },
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router