import { Buyer } from '@/types/cart/buyer.interface';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const createPayment = (cart_id: number, buyer: Buyer) => {
  axios.post(apiUrl + '/api/v1/payments/create', {
    cart_id: cart_id,
    buyer: buyer,
  });
};

const getPaymentStatus = (payment_id: string) => {
  
}