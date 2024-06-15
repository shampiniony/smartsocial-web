<template>
  <button ref="buttonRef" @click="handleClick" class='px-5 py-2 text-white bg-primary rounded-full cursor-pointer w-fit'
    :type="type">
    <div class='flex gap-2'>
      <p>{{ text }}</p>
      <img v-if="icon" :src="icon" alt="">
    </div>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface ButtonProps {
  text: string;
  icon?: string;
  handleClick?: (payload: MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<ButtonProps>(), {
  icon: undefined,
  handleClick: () => { },
  type: 'button'
});

const handleClick = (event: MouseEvent) => {
  if (props.handleClick) {
    props.handleClick(event);
  }
};
</script>
