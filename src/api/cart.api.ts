import axios from 'axios';
import { CartProps } from '@/store/cart.store';

const apiUrl = import.meta.env.VITE_API_URL;

interface ApiCart {
  id?: number;
  tickets: ApiTicket[];
}

interface ApiTicket {
  ticket: number;
  time: Date;
  quantity: number;
}

const parseCart = (cart: ApiCart): Partial<CartProps> => {
  return {
    id: cart.id,
    items: cart.tickets,
  };
};

export const createCart = async (cart: CartProps): Promise<CartProps> => {
  const data: ApiCart = {
    tickets: cart.items.flatMap((item) => ({
      ticket: item.id,
      time: item.time,
      quantity: item.quantity,
    })),
  };

  const response = await axios.post<CartProps>(apiUrl + '/api/v1/carts/', data);
};

export const updateCart = async (cart: CartProps): Promise<CartProps> => {
  if (cart.id == null) {
    return createCart(cart);
  } else {
    const data: ApiCart = {
      id: cart.id,
      tickets: cart.items.flatMap((item) => ({
        ticket: item.id,
        time: item.time,
        quantity: item.quantity,
      })),
    };

    const response = await axios.patch<ApiCart>(
      apiUrl + `/api/v1/carts/${cart.id}/`,
      data
    );

    return parseCart(response.data);
  }
};
