<template>
  <div class="bg-white pt-5 flex flex-col">
    <div v-for='(section, index) in groupEventsBySection(events)' :key='index'
      class="flex flex-col w-4/5 max-w-[1400px] mx-auto gap-4">
      <div>{{ section.name }}</div>
      <div class="flex flex-wrap gap-4">
        <TimePicker v-for="(event) in section.events"
          :time="`${pad(event.start_datetime.getHours())}:${pad(event.start_datetime.getMinutes())}`"
          :is-active="activeTime === `${pad(event.start_datetime.getHours())}:${pad(event.start_datetime.getMinutes())}`"
          @set-active="setActiveTime" @click='() => modal.selected = event' />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { pad } from '@/utils'
import TimePicker from '@/models/place/time-picker.vue'
import { Event as IEvent } from '@/types/client/event.interface';
import { modal } from '@/store/modal.store';

defineProps<{ events: IEvent[] }>();
const activeTime = ref<string | null>(null);

watch(modal, () => {
  if (modal.selected == null && activeTime != null)
    activeTime.value = null;
})

function groupEventsBySection(events: IEvent[]): { name: string; id: number; events: IEvent[] }[] {
  const sections: { name: string; id: number; events: IEvent[] }[] = [];

  events.forEach(event => {
    let section = sections.find(section => section.id === event.id && section.name === event.name);

    if (!section) {
      section = {
        name: event.name,
        id: event.id,
        events: []
      };
      sections.push(section);
    }

    section.events.push(event);
  });

  return sections;
}

const setActiveTime = (time: string) => {
  activeTime.value = time
}
</script>
