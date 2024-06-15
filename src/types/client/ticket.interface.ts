type TicketType = 'family' | 'group' | 'adult' | 'child' | 'discount';

export interface Ticket {
  ticket_id: number;
  name: string;
  type: TicketType;
  price: number;
  personas: number;
  event_id: number;
  event_name: string;
}

export interface TimedTicket extends Ticket {
  time: Date;
}