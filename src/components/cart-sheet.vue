<template>
  <Sheet :open="cart.visible" @update:open="() => {
    cart.visible = false;
  }">
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent class="p-10 pb-10 flex flex-col justify-between">
      <div class="flex flex-col gap-1">
        <h1 class='text-3xl'>Корзина</h1>
        <p class='text-lg font-light'>Составьте свой идеальный маршрут!</p>
      </div>
      <div class='flex gap-5 flex-col'>
        <div v-for='section in cart.items'>
          <p class='pb-2'>{{ section.name }}</p>
          <div class='flex gap-2 flex-col'>
            <Ticket v-for='ticket in section.tickets' :ticket='ticket' variant='full' />
          </div>
        </div>
      </div>
      <div class='flex flex-col gap-10'>
        <div class="flex justify-between items-center">
          <p class='text-lg'>Сумма единого билета</p>
          <p class="text-2xl">{{ total }} ₽</p>
        </div>
        <div class='flex justify-end'>
          <Button text="Перейти к оплате" />
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cart } from '@/store/cart.store';
import Button from '@/components/ui/button/Button.vue';
import Ticket from '@/components/ticket.vue';
import { computed } from 'vue';


const total = computed(() => cart.items.reduce((total, place) => {
  return total + place.tickets.reduce((placeTotal, ticket) => {
    return placeTotal + (ticket.quantity * ticket.price);
  }, 0);
}, 0))

</script>
