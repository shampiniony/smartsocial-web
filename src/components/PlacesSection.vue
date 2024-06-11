<template>
  <div class='flex justify-between'>
    <h1 class='text-xl'>Все места</h1>
    <p class='text-primary font-light leading-[2]'>показать на карте</p>
  </div>
  <div class='py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
    <PlaceCard />
    <PlaceCard />
    <PlaceCard />
  </div>
</template>

<script setup lang='ts'>
import PlaceCard from '@/components/PlaceCard.vue'
</script>