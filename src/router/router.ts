import AdminLayout from '@/layouts/admin.layout.vue';
import HomeLayout from '@/layouts/home.layout.vue';
import DefaultLayout from '@/layouts/default.layout.vue';

import PlacePage from '@/pages/place.page.vue';
import CalendarTempPage from '@/pages/temporary-calendar.page.vue';
import PaymentPage from '@/pages/payment.page.vue';
import NotFoundPage from '@/pages/not-found.page.vue';
import BookingPage from '@/pages/booking.page.vue';
import HomePage from '@/pages/home.page.vue';
import BillingsPage from '@/pages/billings.page.vue';

import { createRouter, createWebHistory } from 'vue-router';

export const apiUrl = import.meta.env.VITE_API_URL;
export const appUrl = import.meta.env.VITE_APP_URL;

const routes = [
  {
    path: '/*',
    name: 'Default',
    component: DefaultLayout,
    children: [
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
        path: '/booking/:id',
        name: 'Booking',
        component: BookingPage,
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'HomePage',
        component: HomePage,
      },
      {
        path: 'place/:id',
        name: 'Place',
        component: PlacePage,
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminLayout,
    children: [
      {
        path: 'calendar',
        name: 'Calendar',
        component: CalendarTempPage,
      },
      {
        path: 'billing',
        name: 'Billing',
        component: BillingsPage,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
