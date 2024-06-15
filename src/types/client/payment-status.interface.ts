export interface PaymentStatus {
  payment_status: string;
  total: number;
}


export interface SucessfulPayment extends PaymentStatus {
  ticket_url: string;
}