import { Buyer } from '@/types/cart/buyer.interface';
import {
  PaymentData,
  PaymentStatus,
} from '@/types/client/payment-status.interface';
import axios from 'axios';

import { apiUrl } from '@/router/router';

export const createPayment = async (
  cart_id: number,
  buyer: Buyer
): Promise<PaymentData> => {
  const response = await axios.post<PaymentData>(
    `${apiUrl}/api/v1/payments/create/`,
    {
      cart_id: cart_id,
      buyer: buyer,
    }
  );

  return response.data;
};

export const getPaymentStatus = async (
  payment_id: string
): Promise<PaymentStatus> => {
  const result = await axios.get<PaymentStatus>(
    `${apiUrl}/api/v1/payments/check/${payment_id}/`
  );

  return result.data;
};
