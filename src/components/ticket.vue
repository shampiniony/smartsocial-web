<template>
  <div class='h-26 w-full border rounded-3xl flex p-5 px-8 gap-2 justify-between'>
    <div class='flex flex-col justify-between'>
      <p>Взрослый билет</p>
      <p class='text-2xl'>1 500 ₽</p>
    </div>
    <div class='flex flex-col justify-center'>
      <div class='border rounded-full flex justify-between items-center'>
        <div @click='ticket.quantity--' class='p-2 pl-4 cursor-pointer font-light text-2xl'>-</div>
        <div class='p-2 px-2'>{{ ticket.quantity }}</div>
        <div @click='ticket.quantity++' class='p-2 pr-4 cursor-pointer font-light text-2xl'>+</div>
      </div>
    </div>
    <div v-if='props.variant == "full"'
      class='hidden md:flex flex-col justify-center text-muted-foreground cursor-pointer'>
      <div @click='ticket.quantity = 0' class='flex items-center gap-2'>
        <img class='h-5 w-5' src='@/assets/icons/trash.svg' alt=''>
        <p class='text-lg'>Удалить</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue';
import { CartTicket } from '@/types/cart/cart-ticket.interface';

type TicketVariant = 'full' | 'short'

interface TicketProps {
  ticket: CartTicket;
  variant?: TicketVariant;
}

const props = withDefaults(defineProps<TicketProps>(), {
  variant: 'short',
})

</script>
