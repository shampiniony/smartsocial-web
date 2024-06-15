import axios from 'axios';
import { apiUrl } from '@/router/router';

export const getBookings = () => {
  axios.get(`${apiUrl}/api/v1/bookings/<int:pk>/visit/`);
};
