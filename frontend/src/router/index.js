import { createRouter, createWebHistory } from 'vue-router';
import Chat from '../pages/Chat.vue';
import Auth from '../pages/Auth.vue';
import Welcome from '../components/chat/messages/Welcome.vue';
import Dialog from '../components/chat/messages/Dialog.vue';
import Login from '../components/auth/Login.vue';
import Registration from '../components/auth/Registration.vue';

const routes = [
  {
    path: '/',
    redirect: '/auth/login',
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    children: [
      {
        path: '',
        name: 'welcome',
        component: Welcome,
        meta: { show: 'sidbar' },
      },
      {
        path: ':id',
        name: 'dialog',
        component: Dialog,
        meta: { show: 'dialog' },
      },
    ],
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;