import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';
import calendarTempPage from '@/pages/temporary-calendar.page.vue';
import paymentPage from '@/pages/payment.page.vue';
import notFoundPage from '@/pages/not-found.page.vue';
import adminPage from '@/pages/admin.page.vue';
import buyerPage from '@/pages/buyers.page.vue';

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
  {
    path: '/payment/:id',
    name: 'Payment',
    component: paymentPage,
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: notFoundPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: adminPage,
  },
  {
    path: '/admin/calendar',
    name: 'Calendar',
    component: calendarTempPage,
  },
  {
    path: '/admin/buyers',
    name: 'Buyers',
    component: buyerPage
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
