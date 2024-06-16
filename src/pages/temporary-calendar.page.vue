<template>
  <div class="flex w-full bg-secondary">
    <div class="w-full">
      <ScheduleXCalendar class="z-0" v-if="calendarApp" :calendar-app="calendarApp" />
    </div>
    <EventEditor :is-open="isOpen" @toggle-sidebar="toggleSidebar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ScheduleXCalendar } from '@schedule-x/vue'
import { createCalendar, viewDay, viewWeek } from '@schedule-x/calendar'
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence"
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import '@schedule-x/theme-default/dist/index.css'
import { getEvents, updateICalOnServer } from '@/api/event.api'
import { formatDateTimeForICal, getICalData } from '@/custom-utils/ical.parser'
import { IEventTime } from '@/interfaces/ical.interface'
import EventEditor from '@/models/calendar/event-editor.vue'

function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

const directEvents = ref<IEventTime[]>([]);
let iCals: {
  event_id?: number,
  ical: string
}[] = []
const calendarApp = ref<any>(null);
const isOpen = ref(false);

const updateICalDate = (event_id: number, icalData: string, index: number, startTime: string, endTime: string) => {
  const dtstartRegex = /DTSTART:[^\n]*/g;
  const dtendRegex = /DTEND:[^\n]*/g;

  const dtstartMatches = [...icalData.matchAll(dtstartRegex)];
  const dtendMatches = [...icalData.matchAll(dtendRegex)];

  console.log("matches:" + dtstartMatches)

  if (dtstartMatches[index] && dtendMatches[index]) {
    let updatedIcalData = icalData;
    
    updatedIcalData = updatedIcalData.replace(dtstartMatches[index][0], `DTSTART:${startTime}`);
    updatedIcalData = updatedIcalData.replace(dtendMatches[index][0], `DTEND:${endTime}`);
    
    const iCalIndex = iCals.findIndex(iCal => iCal.event_id === event_id);
    if (iCalIndex !== -1) {
      iCals[iCalIndex].ical = updatedIcalData;
    }

    console.log('Updated iCal Data:', updatedIcalData);
    updateICalOnServer(event_id, updatedIcalData);
  }
}

const createICalDate = () => {

}

const loadEvents = async () => {
  try {
    const eventResponses = await getEvents();
    console.log(eventResponses)
    directEvents.value = eventResponses.flatMap(e => getICalData(e.id!, e.name, e.icalendar_data));
    
    iCals = eventResponses.map(e => ({
      event_id: e.id!,
      ical: e.icalendar_data
    }));
    console.log(directEvents.value)

    // Создание календаря после загрузки событий
    calendarApp.value = createCalendar({
      selectedDate: '2024-06-15',
      views: [viewDay, viewWeek],
      defaultView: viewWeek.name,
      locale: 'ru-RU',
      plugins: [
        createEventRecurrencePlugin(),
        createDragAndDropPlugin(),
        createResizePlugin(30)
      ],
      events: directEvents.value,
      callbacks: {
        onRangeUpdate(range) {
          console.log('new calendar range start date', range.start)
          console.log('new calendar range end date', range.end)
        },
        onEventUpdate(updatedEvent) {
          const startTime = formatDateTimeForICal(updatedEvent.start);
          const endTime = formatDateTimeForICal(updatedEvent.end);
          const index = updatedEvent.index;
          const event_id = updatedEvent.event_id;

          updateICalDate(event_id, iCals.find(iCal => iCal.event_id === event_id)?.ical || '', index, startTime, endTime);

          console.log('onEventUpdate', updatedEvent)
        },
        onEventClick(calendarEvent) {
          console.log('onEventClick', calendarEvent)
        },
        onClickDate(date) {
          console.log('onClickDate', date) // e.g. 2024-01-01
        },
        onClickDateTime(dateTime) {
          console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
        },
        onClickAgendaDate(date) {
          console.log('onClickAgendaDate', date) // e.g. 2024-01-01
        },
        onDoubleClickDate(date) {
          console.log('onClickDate', date)
        },
        onDoubleClickDateTime(dateTime) {
          const startTime = formatDateTimeForICal(dateTime);
          const duration = 90;
          const endTime = startTime + duration;

          isOpen.value = true;

          console.log(isOpen.value)
          console.log(startTime)
          console.log('onDoubleClickDateTime', dateTime)
        },
        onClickPlusEvents(date) {
          console.log('onClickPlusEvents', date) // e.g. 2024-01-01
        },
        onSelectedDateUpdate(date) {
          console.log('onSelectedDateUpdate', date)
        },
      },
    });
  } catch (error) {
    console.error("Ошибка загрузки событий:", error);
  }
};

onMounted(async () => {
  await loadEvents();
});
</script>
