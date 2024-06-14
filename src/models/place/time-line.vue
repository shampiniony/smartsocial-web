<template>
  <div class="bg-white pt-5">
    <div class="flex flex-wrap gap-4 w-4/5 max-w-[1400px] mx-auto">
      <TimePicker v-for="(event, index) in events" :key="index"
        :time="`${event.start_datetime.getHours()}:${event.start_datetime.getMinutes()}`"
        :is-active="activeTime === `${event.start_datetime.getHours()}:${event.start_datetime.getMinutes()}`"
        @set-active="setActiveTime" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import TimePicker from '@/models/place/time-picker.vue'
import { Event as IEvent } from '@/types/client/event.interface';

defineProps<{ events: IEvent[] }>();
const activeTime = ref<string | null>(null);

const setActiveTime = (time: string) => {
  activeTime.value = time
}
</script>
