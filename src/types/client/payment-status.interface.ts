export type Status = "succeeded" | "canceled" | "pending";

export interface PaymentStatus {
  payment_status: Status;
  total: number;
}


export interface SucessfulPayment extends PaymentStatus {
  ticket_url: string;
}