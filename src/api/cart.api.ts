import axios from 'axios';
import { CartProps } from '@/store/cart.store';
import { CartTicket } from '@/types/cart/cart-ticket.interface';

const apiUrl = import.meta.env.VITE_API_URL;

interface ApiCart {
  id?: number;
  tickets: CartTicket[];
}

interface ApiTicket {
  ticket: number;
  time: Date;
  quantity: number;
}

async function fetchTicketDetails(ticketId: number): Promise<CartTicket> {
  const response = await axios.get<CartTicket>(
    `${apiUrl}/api/v1/tickets/${ticketId}/`
  );
  return response.data;
}

const parseCart = (cart: ApiCart): Partial<CartProps> => {
  return {
    id: cart.id,
    tickets: cart.tickets.flatMap((x) => ({
      ...x,
      time: new Date(x.time),
    })),
  };
};

export const createCart = async (
  cart: CartProps
): Promise<Partial<CartProps>> => {
  const data: ApiCart = {
    tickets: cart.tickets,
  };

  const response = await axios.post<ApiCart>(`${apiUrl}/api/v1/carts/`, data);
  return parseCart(response.data);
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
