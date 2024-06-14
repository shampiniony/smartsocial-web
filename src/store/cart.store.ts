import { reactive, watch, nextTick } from 'vue';
import { CartTicket } from '@/types/cart/cart-ticket.interface';
import { updateCart } from '@/api/cart.api';

let isUpdating = false;

type CartStatus = 'contents' | 'payment';
export interface CartProps {
  id: number | null;
  visible: boolean;
  status: CartStatus;
  items: CartTicket[];
}

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

    newCart.items = cart.items.filter((item) => item.quantity > 0);
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
