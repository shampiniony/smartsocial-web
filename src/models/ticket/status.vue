<template>
  <Paragraph :class="['w-max rounded-3xl', statusClass]">
    {{ statusText }}
  </Paragraph>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import Paragraph from './paragraph.vue';
import { Status } from '@/types/client/payment-status.interface';

const props = defineProps<{ status: Status }>();

const statusClass = computed(() => {
  switch (props.status) {
    case 'succeeded':
      return 'bg-green-100';
    case 'pending':
      return 'bg-yellow-100'
    default:
      return 'bg-red-100';
  }
});

const statusText = computed(() => {
  switch (props.status) {
    case 'succeeded':
      return 'Оплачено';
    case 'pending':
      return 'В обработке'
    default:
      return 'Отклонено';
  }
});
</script>
