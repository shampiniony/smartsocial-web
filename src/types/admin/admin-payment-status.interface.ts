import { Buyer } from '@/types/cart/buyer.interface';
import { Status } from '@/types/client/payment-status.interface';

export interface AdminPaymentStatus {
  buyer: Buyer;
  payment_id: string;
  total: number;
  created_at: Date;
  payment_status: Status;
  ticket_file: string;
}
