<template>
  <Paragraph :class="['w-max rounded-3xl', statusClass]">
    {{ statusText }}
  </Paragraph>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import Paragraph from './paragraph.vue';

const props = defineProps<{ status: 'succeed' | 'error' }>();

const statusClass = computed(() => {
  return props.status === 'succeed' ? 'bg-green-100' : 'bg-red-100';
});

const statusText = computed(() => {
  return props.status === 'succeed' ? 'Оплачено' : 'Отклонено';
});
</script>

<style scoped>
</style>
