<template>
  <div class='py-8'>
    <Transition name="fade" mode='out-in'>
      <h1 class='text-slate-500 font-light' :key="picked_date.date_object.getMonth()">
        {{ months[picked_date.date_object.getMonth()] }}
      </h1>
    </Transition>
    <div class='w-full overflow-x-scroll flex gap-5 no-scrollbar snap-x snap-proximity'>
      <Weekday v-for="(_, index) in 64" :key="index" :day="getDay(index)"
        :isSelected="picked_date.date === getDay(index).date" @click="() =>
          picked_date = getDay(index)
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

const picked_date = ref<Day>({
  date: today.getDate(),
  weekday: weekdays[today.getDay()],
  date_object: today
});

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