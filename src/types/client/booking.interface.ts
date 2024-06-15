import { AdminEvent } from '@/api/event.api';
import { Ticket } from './ticket.interface';

export interface Booking {
  id: number;
  event: AdminEvent;
  ticket: Ticket;
  time: Date;
  visited: boolean;
}