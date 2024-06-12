import { Ticket } from '@/types/client/ticket.interface';

export interface AdminTicket extends Ticket {
  event_id: number;
}
