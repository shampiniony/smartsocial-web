<template>
  <div :class='{ "pb-8": !drawer.visible, "pb-4": drawer.visible }' class='pt-4 transition-padding'>
    <Transition name="fade" mode='out-in'>
      <h1 :class='{ "pb-2": drawer.visible, "pb-4": !drawer.visible }'
        class='mx-5 text-muted-foreground font-light transition-padding'
        :key="getDay(picked_date).date_object.getMonth()">
        {{ months[getDay(picked_date).date_object.getMonth()] }}
      </h1>
    </Transition>
    <div class='w-full px-5 overflow-x-scroll flex no-scrollbar snap-x snap-proximity'>
      <Weekday v-for="(_, index) in 64" :key="index" :day="getDay(index)" :isSelected="picked_date === index" @click="() =>
        picked_date = index
        " />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Transition } from 'vue'
import Weekday from '@/models/home/weekday.vue'

import { drawer } from '@/store/drawer';

interface Day {
  date: number;
  weekday: string;
  date_object: Date;
}

const today = new Date();

const weekdays = [
  "ПН",
  "ВТ",
  "СР",
  "ЧТ",
  "ПТ",
  "СБ",
  "ВС",
];

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

const getDay = (offset: number) => {

  const new_date = new Date(today);
  new_date.setDate(today.getDate() + offset);

  return {
    date: new_date.getDate(),
    weekday: weekdays[new_date.getDay()],
    date_object: new_date
  }
}

const picked_date = ref(0);

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

.transition-padding {
  transition: padding 0.5s ease;
  transition: height 0.5s ease;
  transition: min-width 0.5s ease;
}
</style>