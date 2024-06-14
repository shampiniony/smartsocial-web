<template>
  <div @click='onClick' class='pl-5 snap-start'>
    <div :class='containerClasses'
      class='flex flex-col justify-around cursor-pointer rounded-xl p-2 transition-colors transition-padding'>
      <p :class='{ "text-xs": drawer.visible, "text-lg": !drawer.visible }'
        class='font-medium text-center transition-padding'>
        {{ date.getDate() }}
      </p>
      <p class='text-center text-xs' :class='weekdayClasses'>
        {{ getWeekday(date) }}
      </p>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { computed } from 'vue';
import { drawer } from '@/store/drawer.store';


const props = defineProps<{
  date: Date;
  isSelected: boolean;
  onClick: () => void;
}>();


const weekdays = [
  "ПН",
  "ВТ",
  "СР",
  "ЧТ",
  "ПТ",
  "СБ",
  "ВС",
];

const getWeekday = (date: Date) => {
  return weekdays[date.getDay()];
}

const containerClasses = computed(() => ({
  'border': props.isSelected,
  'border-primary': props.isSelected,
  'h-18': !drawer.visible,
  'min-w-14': !drawer.visible,
  'h-12': drawer.visible,
  'min-w-8': drawer.visible
}));

const weekdayClasses = computed(() => ({
  'text-primary': props.date.getDay() > 4,
  'text-muted-foreground': props.date.getDay() <= 4,
}));

</script>

<style scoped>
.transition-padding {
  transition: padding 0.5s ease;
  transition: height 0.5s ease;
  transition: min-width 0.5s ease;
}
</style>
