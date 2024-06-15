import { Ticket } from '@/types/client/ticket.interface';
import { formatDateToISO } from '@/utils';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const getTickets = async (event_id: number): Promise<Ticket[]> => {
  const result = await axios.get<Ticket[]>(
    `${apiUrl}/api/v1/events/${event_id}/tickets/`
  );

  console.log(result.data);

  return result.data;
};

export const getTicketsV2 = async (
  event_id: number,
  from: Date,
  to: Date
): Promise<Ticket[]> => {
  const result = await axios.get<Ticket[]>(
    `${apiUrl}/api/v1/events/${event_id}/tickets/available/?start_datetime=${formatDateToISO(
      from
    )}&end_datetime=${formatDateToISO(to)}`
  );

  console.log(result.data);

  return result.data;
};
