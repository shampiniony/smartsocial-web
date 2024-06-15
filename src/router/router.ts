import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';
import paymentPage from '@/pages/payment.page.vue';

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
    path: '/payment/:id',
    name: 'Payment',
    component: paymentPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
