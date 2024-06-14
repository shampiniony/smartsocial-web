import { reactive, watch, nextTick } from 'vue';
import { CartTicket } from '@/types/cart/cart-ticket.interface';
import { updateCart } from '@/api/cart.api';

let isUpdating = false;

interface CartPlace {
  name: string;
  tickets: CartTicket[];
}

type CartStatus = 'contents' | 'payment';
export interface CartProps {
  id: number | null;
  visible: boolean;
  status: CartStatus;
  items: CartPlace[];
}

// Helper function to load cart data from localStorage
const loadCartFromLocalStorage = (): CartProps => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
    }
  }
  return {
    id: null,
    visible: false,
    status: 'contents',
    items: [],
  };
};

export const cart = reactive<CartProps>(loadCartFromLocalStorage());

watch(
  () => cart,
  async (newCart) => {
    if (isUpdating) return;
    isUpdating = true;

    newCart.items.forEach((place) => {
      place.tickets = place.tickets.filter((ticket) => ticket.quantity > 0);
    });

    newCart.items = newCart.items.filter((x) => x.tickets.length > 0);
    newCart = await updateCart(newCart);

    newCart.visible = cart.visible;

    localStorage.setItem('cart', JSON.stringify(newCart));

    nextTick(() => {
      isUpdating = false;
    });
  },
  { deep: true }
);

watch(
  () => cart.visible,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
);
