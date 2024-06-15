import axios from 'axios';
import { CartProps } from '@/store/cart.store';
import { CartTicket } from '@/types/cart/cart-ticket.interface';

const apiUrl = import.meta.env.VITE_API_URL;

interface ApiCart {
  id: number | null;
  tickets: CartTicket[];
}

const parseCart = (cart: ApiCart): Partial<CartProps> => {
  return {
    id: cart.id,
    tickets: cart.tickets,
  };
};

export const createCart = async (cart: CartProps): Promise<CartProps> => {
  const data: ApiCart = {
    id: cart.id,
    tickets: cart.tickets,
  };

  const response = await axios.post<CartProps>(apiUrl + '/api/v1/carts/', data);
  return response.data;
};

export const updateCart = async (
  cart: CartProps
): Promise<Partial<CartProps>> => {
  console.log(cart);
  if (cart.id == null) {
    return createCart(cart);
  } else {
    const data: ApiCart = {
      id: cart.id,
      tickets: cart.tickets,
    };

    const response = await axios.patch<ApiCart>(
      `${apiUrl}/api/v1/carts/${cart.id}/`,
      data
    );

    return parseCart(response.data);
  }
};
