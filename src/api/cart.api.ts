import axios from 'axios';
import { CartProps } from '@/store/cart.store';
import { AdminTicket } from '@/types/admin/admin-ticket.interface';

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

interface ApiCartResponse {
  id: number;
  tickets: ApiTicketResponse[];
}

interface ApiTicketResponse {
  id: number;
  ticket: AdminTicket;
  time: Date;
  quantity: number;
}

const parseCart = (cart: ApiCartResponse): Partial<CartProps> => {
  return {
    id: cart.id,
    items: cart.tickets.flatMap((ticket) => {
      return {
        quantity: ticket.quantity,
        time: ticket.time,
        ...ticket.ticket,
      };
    }),
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
  return response.data;
};

export const updateCart = async (
  cart: CartProps
): Promise<Partial<CartProps>> => {
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

    const response = await axios.patch<ApiCartResponse>(
      `${apiUrl}/api/v1/carts/${cart.id}/`,
      data
    );

    return parseCart(response.data);
  }
};
