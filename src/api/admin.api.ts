import axios from 'axios';
import { apiUrl } from '@/router/router';

export const getBookings = async () => {
  await axios.get(`${apiUrl}/api/v1/amo/bookings/`);
};
