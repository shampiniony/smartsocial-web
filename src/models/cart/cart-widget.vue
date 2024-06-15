<template>
  <div class='flex flex-col justify-between h-full'>
    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl">Оплата</h1>
        <p class="text-xl cursor-pointer" @click="cart.status = 'payment'">X</p>
      </div>
    </div>

    <!-- <PaymentWidget /> -->
  </div>
</template>

<script setup lang="ts">
import PaymentWidget from './payment-widget.vue'
import { cart } from '@/store/cart.store'
</script>
