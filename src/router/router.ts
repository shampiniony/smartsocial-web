import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/place/:id',
    name: 'Place',
    component: placePage,
  },
  {
    path: '/',
    name: 'Home',
    component: homePage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
