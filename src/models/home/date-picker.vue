<!-- Todo: fix this messy code -->

<template>
  <div :class='{ "pb-8": !drawer.visible, "pb-4": drawer.visible }' class='pt-4 transition-padding'>
    <Transition name="fade" mode='out-in'>
      <h1 :class='{ "pb-2": drawer.visible, "pb-4": !drawer.visible }' class='mx-5 text-muted-foreground font-light'
        :key="getFutureDate(picked_date).getMonth()">
        {{ months[getFutureDate(picked_date).getMonth()] }}
      </h1>
    </Transition>
    <div class='w-full px-5 overflow-x-scroll flex no-scrollbar snap-x snap-proximity'>
      <Weekday v-for="(_, index) in 64" :key="index" :date="getFutureDate(index)" :isSelected="picked_date === index"
        @click="() =>
          picked_date = index
          " />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Transition, watch } from 'vue'

import Weekday from '@/models/home/week-day.vue'

import { drawer } from '@/store/drawer.store';
import getPlaces from '@/api/places.api';

const months = [
  "ЯНВАРЬ",
  "ФЕВРАЛЬ",
  "МАРТ",
  "АПРЕЛЬ",
  "МАЙ",
  "ИЮНЬ",
  "ИЮЛЬ",
  "АВГУСТ",
  "СЕНТЯБРЬ",
  "ОКТЯБРЬ",
  "НОЯБРЬ",
  "ДЕКАБРЬ",
];

const today = new Date();

const getFutureDate = (offset: number): Date => {
  const new_date = new Date(today);
  new_date.setDate(today.getDate() + offset);

  return new_date;
}

const picked_date = ref(0);

watch(
  picked_date,
  () => {
    getPlaces(getFutureDate(picked_date.value))
  }
)

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.transition-padding {
  transition: padding 0.5s ease;
  transition: height 0.5s ease;
  transition: min-width 0.5s ease;
}
</style>
