import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
import Dialog from '../views/Dialog.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Index,
  },
  {
    path: '/dialog/:id',
    name: 'dialog',
    component: Dialog,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
