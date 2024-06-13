<template>
  <div v-drag="dragHandler" class='rounded-xl -mt-5 bg-white relative'>
    <div class="touch-none h-8 flex justify-center items-center pt-2">
      <div :class='{ "bg-muted sm:bg-white": drawer.visible }' class="h-[5px] w-12 rounded-full"></div>
    </div>
    <div class="px-5 flex justify-between">
      <h1 class="text-xl">Все места</h1>
    </div>
    <div class="py-2 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <PlaceCard v-for='place in places.all' :place='place' />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlaceCard from './place-card.vue'
import { drawer } from '@/store/drawer.store'
import { places } from '@/store/places.store'

const dragHandler = ({ dragging }: any) => {
  if (drawer.visible && dragging) drawer.visible = false;
}
</script>
