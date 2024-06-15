export type Status = 'succeeded' | 'canceled' | 'pending';

export interface PaymentStatus {
  payment_status: Status;
  total: number;
}

export interface SucessfulPayment extends PaymentStatus {
  ticket_url: string;
}

export interface PaymentData {
  cart_id: number;
  confirmation_token: string;
  message: string;
  order_id: number;
  payment_id: string;
  payment_status: Status;
}
