import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';
import notFoundPage from '@/pages/not-found.page.vue';
import ticketPage from '@/pages/ticket.page.vue';
import adminPage from '@/pages/admin.page.vue';

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
    path: '/:catchAll(.*)',
    name: '404',
    component: notFoundPage,
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: ticketPage,
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
