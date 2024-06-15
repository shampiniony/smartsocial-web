import axios from 'axios';
import { apiUrl } from '@/router/router';
import { Booking } from '@/types/client/booking.interface';

export const getBookings = async (payment_id: string): Promise<Booking[]> => {
  const result = await axios.get<Booking[]>(
    `${apiUrl}/api/v1/payments/order/${payment_id}/bookings/`
  );

  return result.data.flatMap((x) => ({
    ...x,
    time: new Date(x.time),
  }));
};

export const toggleBooking = async (booking_id: number) => {
  await axios.get(`${apiUrl}/api/v1/bookings/${booking_id}/visit/`);
};
