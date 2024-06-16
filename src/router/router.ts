import AdminLayout from '@/layouts/admin.layout.vue';
import HomeLayout from '@/layouts/home.layout.vue';
import DefaultLayout from '@/layouts/default.layout.vue';
import BuyerPage from '@/pages/buyers.page.vue';
import CalendarTempPage from '@/pages/temporary-calendar.page.vue';
import HomePage from '@/pages/home.page.vue';
import PlacePage from '@/pages/place.page.vue';
import PaymentPage from '@/pages/payment.page.vue';
import NotFoundPage from '@/pages/not-found.page.vue';
import BookingPage from '@/pages/booking.page.vue';
import BillingsPage from '@/pages/billings.page.vue';
import LoginPage from '@/pages/login.page.vue';
import Registration from '@/pages/registration.page.vue';
import UsersList from '@/pages/userslist.page.vue';

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
        path: '/booking/:id',
        name: 'Booking',
        component: BookingPage,
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        component: NotFoundPage,
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
      {
        path: 'registration',
        name: 'Registration',
        component: Registration,
      },
      {
        path: 'userslist',
        name: 'UsersList',
        component: UsersList,
      }
    ],
  }, 
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
