import { Ticket } from '@/types/client/ticket.interface';

export interface CartTicket extends Ticket {
  quantity: number;
}
