import { createApp } from 'vue';
import { GesturePlugin } from '@vueuse/gesture';
import { MotionPlugin } from '@vueuse/motion';
import 'leaflet/dist/leaflet.css';
import App from './App.vue';
import './assets/index.css';
import { createMemoryHistory, createRouter } from 'vue-router';

import Home from '@/pages/home.page.vue';
import Place from '@/pages/place.page.vue';

const app = createApp(App);

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    // { path: '/', name: 'home', component: Home },
    { path: '/', name: 'place', component: Place },
  ],
});

app.use(GesturePlugin);
app.use(MotionPlugin);
app.use(router);

app.mount('#app');
