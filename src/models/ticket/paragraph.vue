<template>
  <p :class="['py-2 px-2 md:px-4', customClass]">
    <slot></slot>
  </p>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{ customClass?: string }>();
const { customClass } = props;
</script>

<style scoped>
/* Добавьте свои стили, если необходимо */
</style>
