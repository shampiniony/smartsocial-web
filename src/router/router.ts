import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';
import adminPage from '@/pages/admin.page.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/place',
    name: 'Place',
    component: placePage,
  },
  {
    path: '/',
    name: 'Home',
    component: homePage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: adminPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
