import { Ticket, TimedTicket } from '@/types/client/ticket.interface';
import axios from 'axios';

import { apiUrl } from '@/router/router';

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
): Promise<TimedTicket[]> => {
  const result = await axios.get<TimedTicket[]>(
    `${apiUrl}/api/v1/events/${event_id}/tickets/available/?start_datetime=${from.toISOString()}&end_datetime=${to.toISOString()}`
  );

  console.log(result.data);

  const data: TimedTicket[] = result.data.flatMap((x) => ({
    ...x,
    time: new Date(x.time),
  }));

  return data;
};
