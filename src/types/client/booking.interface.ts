import { TicketType } from './ticket.interface';

interface BookingTicket {
  ticket_id: number;
  name: string;
  type: TicketType;
  price: number;
  personas: number;
}

export interface Booking {
  id: number;
  event: number;
  ticket: BookingTicket;
  time: Date;
  visited: boolean;
}
