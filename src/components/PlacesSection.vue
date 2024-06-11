<template>
  <div v-drag="dragHandler" class='rounded-xl -mt-5 bg-white'>
    <div class="touch-none h-8 flex justify-center items-center">
      <div :class='{ "bg-muted": drawer.visible }' class="h-[5px] w-12 rounded-full"></div>
    </div>
    <div class="px-5 flex justify-between">
      <h1 class="text-xl">Все места</h1>
    </div>
    <div :class='{ "md:hidden": drawer.visible }' class="py-2 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceCard from './PlaceCard.vue'
import { drawer } from '@/store/drawer'

const dragHandler = ({ dragging }: any) => {
  if (drawer.visible && dragging) drawer.visible = false;
}
</script>
