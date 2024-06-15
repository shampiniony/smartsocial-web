<template>
  <div class="w-full h-20 flex justify-between items-center px-5 fixed bg-white z-50">
    <div @click='router.push("/")' class="flex gap-2 cursor-pointer">
      <img src="../assets/logo.svg" class="select-none pointer-events-none" />
      <div class="file leading-3 flex flex-col justify-around">
        <h1 class="font-medium">kolomnago</h1>
        <h1 class="font-light">Афиша Коломны</h1>
      </div>
    </div>
    <div @click="cart.visible = true" class="cursor-pointer flex gap-2">
      <img class="h-6 w-6" src="../assets/icons/cart.svg" alt="">
      <p class='hidden md:block'>
        Корзина
      </p>
    </div>
  </div>
</template>

<script setup>
import { cart } from '@/store/cart.store'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
