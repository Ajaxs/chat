import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../pages/Auth.vue';
import Login from '../components/auth/Login.vue';
import Registration from '../components/auth/Registration.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth/login',
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: 'registration',
        name: 'registration',
        component: Registration,
      },
    ],
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../pages/Chat.vue'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('../components/chat/content/Welcome.vue'),
        //meta: { show: 'sidbar' },
      },
      {
        path: ':id',
        name: 'dialog',
        component: () => import('../components/chat/content/Dialog.vue'),
        //meta: { show: 'dialog' },
      },
    ],
  },
  {
    path: '/draft',
    name: 'draft',
    component: () => import('../pages/Chat.vue'),
    children: [
      {
        path: ':id',
        name: 'dialogDraft',
        component: () => import('../components/chat/content/Dialog.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
