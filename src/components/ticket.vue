<template>
  <div class='h-26 w-full border rounded-3xl flex p-5 px-8 gap-2 justify-between'>
    <div class='flex flex-col justify-between'>
      <p>{{ ticket.name }}</p>
      <p class='text-2xl'>{{ ticket.price.toString().replace(/\.00$/, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} ₽</p>
    </div>
    <div class='flex flex-col justify-center'>
      <div class='border rounded-full flex justify-between items-center'>
        <div @click='decreaseTicket(ticket)' class='p-2 pl-4 cursor-pointer font-light text-2xl'>-</div>
        <div class='p-2 px-2'>{{ getCount(ticket) }}</div>
        <div @click='increaseTicket(ticket)' class='p-2 pr-4 cursor-pointer font-light text-2xl'>+</div>
      </div>
    </div>
    <div v-if='props.variant == "full"'
      class='hidden md:flex flex-col justify-center text-muted-foreground cursor-pointer'>
      <div @click='removeTicket(ticket)' class=' flex items-center gap-2'>
        <img class='h-5 w-5' src='@/assets/icons/trash.svg' alt=''>
        <p class='text-lg'>Удалить</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { CartTicket } from '@/types/cart/cart-ticket.interface';
import { TimedTicket } from '@/types/client/ticket.interface';
import { cart } from '@/store/cart.store';

type TicketVariant = 'full' | 'short'

interface TicketProps {
  ticket: CartTicket | TimedTicket;
  variant?: TicketVariant;
}

const increaseTicket = (ticket: CartTicket | TimedTicket) => {
  if (isCartTicket(ticket)) {
    ticket.quantity++
  } else {
    let qtty = 0;

    let found = false;

    cart.tickets = cart.tickets.flatMap(x => {
      if (x.ticket_id == ticket.ticket_id) {
        qtty = ++x.quantity;
        found = true;
      } else {
        qtty = x.quantity
      }

      return {
        ...x,
        quantity: qtty
      }
    })

    if (!found) {
      cart.tickets = [
        ...cart.tickets,
        {
          ...ticket,
          quantity: 1
        }
      ];
    }
  }
}

const decreaseTicket = (ticket: CartTicket | TimedTicket) => {
  if (isCartTicket(ticket)) {
    ticket.quantity--
  } else {
    cart.tickets = cart.tickets.flatMap(x => ({
      ...x,
      quantity: x.ticket_id == ticket.ticket_id ? --x.quantity : x.quantity
    }))
  }
}

const removeTicket = (ticket: CartTicket | TimedTicket) => {
  if (isCartTicket(ticket)) {
    ticket.quantity = 0;
  } else {
    let eh = cart.tickets.find(x => x.ticket_id == ticket.ticket_id)?.quantity;
    if (eh)
      eh = 0;
  }
}

const getCount = (ticket: CartTicket | TimedTicket): number => {
  if (isCartTicket(ticket)) {
    return ticket.quantity;
  } else {
    return cart.tickets.find(x => x.ticket_id == ticket.ticket_id && x.time == ticket.time)?.quantity ?? 0;
  }
}

function isCartTicket(ticket: CartTicket | TimedTicket): ticket is CartTicket {
  return (ticket as CartTicket).quantity !== undefined;
}

const props = withDefaults(defineProps<TicketProps>(), {
  variant: 'short',
})

</script>
