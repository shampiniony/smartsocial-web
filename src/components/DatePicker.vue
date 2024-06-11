<template>
  <div class='pb-8 pt-4 -mr-5 z-10'>
    <Transition name="fade" mode='out-in'>
      <h1 class='text-muted-foreground font-light pb-4' :key="getDay(picked_date).date_object.getMonth()">
        {{ months[getDay(picked_date).date_object.getMonth()] }}
      </h1>
    </Transition>
    <div class='w-full -mr-5 overflow-x-scroll flex gap-5 no-scrollbar snap-x snap-proximity'>
      <Weekday v-for="(_, index) in 64" :key="index" :day="getDay(index)" :isSelected="picked_date === index" @click="() =>
        picked_date = index
        " />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, Transition } from 'vue'
import Weekday from '@/components/Weekday.vue'

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
</style>