<template>
  <div @click='router.push(`/place/${place.id}`)' class='rounded-2xl border'>
    <img class='w-full rounded-2xl h-60 object-cover' :src='place.images[0].src'>
    <div class='flex gap-3 p-5 flex-col'>
      <h1 class='text-xl'>{{ place.name }}</h1>
      <p class='text-muted-foreground text-lg'>{{ place.address }}</p>
    </div>
  </div>
</template>


<script setup lang='ts'>
import { Place } from '@/types/client/place.interface';
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps<{ place: Place }>();

</script>