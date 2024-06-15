import HomePage from '@/pages/home.page.vue';
import PlacePage from '@/pages/place.page.vue';
import CalendarTempPage from '@/pages/temporary-calendar.page.vue';
import PaymentPage from '@/pages/payment.page.vue';
import NotFoundPage from '@/pages/not-found.page.vue';
import AdminPage from '@/pages/admin.page.vue';
import BookingPage from '@/pages/booking.page.vue';

import { createRouter, createWebHistory } from 'vue-router';

export const apiUrl = import.meta.env.VITE_API_URL;
export const appUrl = import.meta.env.VITE_APP_URL;

const routes = [
  {
    path: '/place/:id',
    name: 'Place',
    component: PlacePage,
  },
  {
    path: '/admin/calendar',
    name: 'Calendar',
    component: CalendarTempPage,
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: PaymentPage,
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: NotFoundPage,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
  },
  {
    path: '/booking/:id',
    name: 'Booking',
    component: BookingPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
