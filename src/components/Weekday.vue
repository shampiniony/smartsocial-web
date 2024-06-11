<template>
  <div @click='onClick' :class='containerClasses'
    class='snap-start flex flex-col h-18 min-w-12 justify-around cursor-pointer rounded-xl p-1 transition-colors'>
    <p class='font-medium text-center text-lg'>
      {{ day.date }}
    </p>
    <p class='text-center text-xs' :class='weekdayClasses'>
      {{ day.weekday }}
    </p>
  </div>
</template>

<script setup lang='ts'>

import { computed, defineProps } from 'vue';

interface Day {
  date: number;
  weekday: string;
}

const props = defineProps<{
  day: Day;
  isSelected: boolean;
  onClick: () => void;
}>();

const containerClasses = computed(() => ({
  'border': props.isSelected,
  'border-primary': props.isSelected,
}));

const weekdayClasses = computed(() => ({
  'text-primary': props.day.weekday === 'СБ' || props.day.weekday === 'ВС',
  'text-slate-500': props.day.weekday !== 'СБ' && props.day.weekday !== 'ВС',
}));

</script>