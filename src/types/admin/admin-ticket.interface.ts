type TicketType = 'family' | 'group' | 'adult' | 'child' | 'discount';

export interface AdminTicket {
  id: number;
  name: string;
  type: TicketType;
  price: number;
  personas: number;
  event_id: number;
  event_name: string;
}
