<template>
  <div class='pt-5 -mt-8 rounded-t-xl bg-white'>
    <div class='px-5 flex justify-between'>
      <h1 class='text-xl'>Все места</h1>
    </div>
    <div class='py-2 px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <PlaceCard />
      <PlaceCard />
      <PlaceCard />
    </div>
  </div>
</template>

<script setup lang='ts'>
import PlaceCard from '@/components/PlaceCard.vue'
</script>