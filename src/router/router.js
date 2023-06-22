import Main from '@/pages/Main.vue'
import CommentsPage from '@/pages/CommentsPage.vue'
import RebuildCommentsPage from '@/pages/RebuildCommentsPage.vue';
import About from '@/pages/About.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/Comments',
    component: CommentsPage,
  },
  {
    path: '/RebuildComments',
    component: RebuildCommentsPage,
  },
  {
    path: '/About',
    component: About,
  }
];

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router