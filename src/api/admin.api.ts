import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const getBookings = async () => {
  await axios.get(`${apiUrl}/api/v1/amo/bookings/`);
};
