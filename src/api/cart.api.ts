import axios from 'axios';
import { CartProps } from '@/store/cart.store';
import { CartTicket } from '@/types/cart/cart-ticket.interface';

const apiUrl = import.meta.env.VITE_API_URL;

interface ApiCart {
  tickets: ApiTicket[];
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

async function parseCart(data: any): Promise<CartProps> {
  const ticketPromises = data.tickets.map(async (ticketData: any) => {
    const ticketDetails = await fetchTicketDetails(ticketData.ticket);
    return {
      ...ticketDetails,
      quantity: ticketData.quantity,
      time: new Date(ticketData.time),
    };
  });

  const cartTickets = await Promise.all(ticketPromises);

  const cart: CartProps = {
    id: data.id || null,
    visible: true, // Default value, as there's no 'visible' field in the given JSON
    status: 'contents', // Default value, as there's no 'status' field in the given JSON
    items: [
      {
        name: 'Default Place', // Default value, adjust as needed
        tickets: cartTickets,
      },
    ],
  };

  return cart;
}

const convertCart = (cart: CartProps): ApiCart => {
  return {
    tickets: cart.items.flatMap((place) =>
      place.tickets.flatMap((ticket) => ({
        ticket: ticket.id,
        time: ticket.time,
        quantity: ticket.quantity,
      }))
    ),
  };
};

export const createCart = async (cart: CartProps): Promise<CartProps> => {
  const data = convertCart(cart);

  const response = await axios.post<CartProps>(`${apiUrl}/api/v1/carts/`, data);
  return parseCart(response.data);
};

export const updateCart = async (cart: CartProps): Promise<CartProps> => {
  if (cart.id == null) {
    return createCart(cart);
  } else {
    const data = convertCart(cart);
    const response = await axios.patch<CartProps>(
      apiUrl + `/api/v1/carts/${cart.id}/`,
      data
    );
    return parseCart(response.data);
  }
};
