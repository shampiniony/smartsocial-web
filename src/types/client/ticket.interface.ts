import { AdminTicket } from '@/types/admin/admin-ticket.interface';

export interface Ticket extends AdminTicket {
  time: Date;
}
