<template>
  <div @click='onClick' class='pl-5 snap-start'>
    <div :class='containerClasses'
      class='flex flex-col justify-around cursor-pointer rounded-xl p-2 transition-colors transition-padding'>
      <p :class='{ "text-xs": drawer.visible, "text-lg": !drawer.visible }'
        class='font-medium text-center transition-padding'>
        {{ day.date }}
      </p>
      <p class='text-center text-xs' :class='weekdayClasses'>
        {{ day.weekday }}
      </p>
    </div>
  </div>
</template>

<script setup lang='ts'>

import { computed } from 'vue';
import { drawer } from '@/store/drawer';

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
  'h-18': !drawer.visible,
  'min-w-14': !drawer.visible,
  'h-12': drawer.visible,
  'min-w-8': drawer.visible
}));

const weekdayClasses = computed(() => ({
  'text-primary': props.day.weekday === 'СБ' || props.day.weekday === 'ВС',
  'text-muted-foreground': props.day.weekday !== 'СБ' && props.day.weekday !== 'ВС',
}));

</script>

<style scoped>
.transition-padding {
  transition: padding 0.5s ease;
  transition: height 0.5s ease;
  transition: min-width 0.5s ease;
}
</style>