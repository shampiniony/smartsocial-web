<template>
  <div>
    <div class="flex flex-col gap-1">
      <div class='flex justify-between items-center'>
        <h1 class='text-3xl'>Оплата</h1>
        <p class='text-xl cursor-pointer' @click='cart.status = "contents"'>X</p>
      </div>
    </div>
  </div>
  <div class='flex flex-col gap-10'>
    <div class="flex justify-between items-center">
      <p class='text-lg'>Сумма единого билета</p>
      <p class="text-2xl">{{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }} ₽</p>
    </div>
    <div class='flex justify-end'>
      <Button text="Оплатить" />
    </div>
  </div>

</template>


<script setup lang="ts">
import { computed } from 'vue';

import { cart } from '@/store/cart.store';
import Button from '@/components/ui/button/Button.vue';
import Ticket from '@/components/ticket.vue';

const total = computed(() => cart.items.reduce((total, place) => {
  return total + place.tickets.reduce((placeTotal, ticket) => {
    return placeTotal + (ticket.quantity * ticket.price);
  }, 0);
}, 0))
</script>
