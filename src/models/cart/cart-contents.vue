<template>
  <div>
    <div class="flex flex-col gap-1">
      <div class='flex justify-between items-center'>
        <h1 class='text-3xl'>Корзина</h1>
        <p class='text-xl cursor-pointer' @click='cart.visible = false'>X</p>
      </div>
      <p class='text-lg font-light'>Составьте свой идеальный маршрут!</p>
    </div>
  </div>
  <div class='flex h-full gap-5 flex-col pt-10'>
    <div v-for='section in groupTicketsByEvent(cart.tickets)'>
      <p class='pb-2'>{{ section.name }}</p>
      <TransitionGroup class='flex gap-2 flex-col' name='fade' tag='div'>
        <Ticket v-for='(ticket, index) in section.events' :key='index' :ticket='ticket' variant='full' />
      </TransitionGroup>
    </div>
  </div>
  <div class='flex flex-col gap-10'>
    <div class="flex justify-between items-center">
      <p class='text-lg'>Сумма единого билета</p>
      <p class="text-2xl">{{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} ₽</p>
    </div>
    <div class='flex justify-end'>
      <Button :handle-click='() => { cart.status = "payment" }' text="Перейти к оплате" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';

import { cart } from '@/store/cart.store';
import Button from '@/components/ui/button/CustomButton.vue';
import Ticket from '@/components/ticket.vue';
import { CartTicket } from '@/types/cart/cart-ticket.interface';

function groupTicketsByEvent(tickets: CartTicket[]): { name: string; id: number; events: CartTicket[] }[] {
  const sections: { name: string; id: number; events: CartTicket[] }[] = [];

  tickets.forEach(ticket => {
    let section = sections.find(section => section.id === ticket.ticket_id && section.name === ticket.name);

    if (!section) {
      section = {
        name: ticket.name,
        id: ticket.ticket_id,
        events: []
      };
      sections.push(section);
    }

    section.events.push(ticket);
  });

  return sections;
}
const total = computed(() => cart.tickets.reduce((total, ticket) => {
  return total + (ticket.quantity * ticket.price);
}, 0))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>