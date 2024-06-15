import { reactive, watch, nextTick } from 'vue';
import { CartTicket } from '@/types/cart/cart-ticket.interface';
import { updateCart } from '@/api/cart.api';

let isUpdating = false;

type CartStatus = 'contents' | 'payment';
export interface CartProps {
  id: number | null;
  visible: boolean;
  status: CartStatus;
  tickets: CartTicket[];
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
    tickets: [],
  };
};

export const cart = reactive<CartProps>(loadCartFromLocalStorage());

watch(
  () => cart,
  async (newCart) => {
    if (isUpdating) return;
    isUpdating = true;

    // Filter out tickets with quantity <= 0
    const filteredTickets = newCart.tickets.filter(
      (ticket) => ticket.quantity > 0
    );

    // Create a new cart object with filtered tickets and update it
    const updatedCart = await updateCart({
      ...newCart,
      tickets: filteredTickets,
    });

    // Update reactive cart properties
    Object.assign(cart, updatedCart);

    // Ensure the visibility state is preserved
    cart.visible = newCart.visible;

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    nextTick(() => {
      isUpdating = false;
    });

    console.log(cart);
  },
  { deep: true }
);

watch(
  () => cart.visible,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
);
