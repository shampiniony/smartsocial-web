import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';
import calendarTempPage from '@/pages/temporary-calendar.page.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/place',
    name: 'Place',
    component: placePage,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: calendarTempPage,
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
