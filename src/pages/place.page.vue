<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'
import TimePicker from '@/models/place/time-picker.vue'

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <div class="">
    <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" />
    <TimePicker></TimePicker>
  </div>
</template>
