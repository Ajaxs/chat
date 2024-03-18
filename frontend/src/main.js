import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import './style.less'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

const app = createApp(App);
app.use(router)
  .use(pinia)
  .use(Antd)
  .mount('#app');
