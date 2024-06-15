<template>
  <Sheet :open="cart.visible" @update:open="() => {
    cart.visible = false;
  }">
    <SheetContent class="p-10 pt-5 flex flex-col justify-between">
      <CartContents v-if='cart.status == "contents"' />
      <CartPayment v-if='cart.status == "payment"' />
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet'
import { cart } from '@/store/cart.store';
import CartContents from '@/models/cart/cart-contents.vue';
import CartPayment from '@/models/cart/cart-payment.vue';
</script>
