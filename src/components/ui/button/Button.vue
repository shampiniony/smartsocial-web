<template>
  <div ref="buttonRef" @click="handleClick"
       class='px-5 py-2 text-white bg-primary rounded-full cursor-pointer w-fit'>
    <div class='flex gap-2'>
      <p>{{ text }}</p>
      <img v-if="icon" :src="icon" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface ButtonProps {
  text: string;
  icon?: string;
  handleClick?: (payload: MouseEvent) => void;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  icon: undefined,
  handleClick: () => {}
});

const handleClick = (event: MouseEvent) => {
  if (props.handleClick) {
    props.handleClick(event);
  }
};
</script>
