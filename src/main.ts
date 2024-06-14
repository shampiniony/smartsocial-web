import { createApp } from 'vue';
import { GesturePlugin } from '@vueuse/gesture';
import { MotionPlugin } from '@vueuse/motion';
import 'leaflet/dist/leaflet.css';
import App from './App.vue';
import './assets/index.css';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: routes.routes,
});

app.use(GesturePlugin);
app.use(MotionPlugin);
app.use(router);

app.mount('#app');
