import homePage from '@/pages/home.page.vue';
import placePage from '@/pages/place.page.vue';
import ticketPage from '@/pages/ticket.page.vue';

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
    path: '/ticket',
    name: 'Ticket',
    component: ticketPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
