<template>
  <div class="w-full" @click="handleClick">
    <ScheduleXCalendar
      class="z-0" 
      :calendar-app="calendarApp" 
    />
    <div v-if="showModal" :style="{ top: modalTop + 'px', left: modalLeft + 'px' }" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Модальное окно</p>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  viewDay,
  viewWeek,
} from '@schedule-x/calendar'
import { createEventRecurrencePlugin } from "@schedule-x/event-recurrence"
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createCurrentTimePlugin } from '@schedule-x/current-time'
import '@schedule-x/theme-default/dist/index.css'
import ical from 'node-ical'
import { onMounted, ref } from 'vue'
import { AdminEvent, getEvents } from '@/api/event.api'
import axios from 'axios'

// const directEvents = ical.sync.parseICS(`
// BEGIN:VCALENDAR
// VERSION:2.0
// PRODID:-//ical.marudot.com//iCal Event Maker
// CALSCALE:GREGORIAN
// BEGIN:VTIMEZONE
// TZID:Europe/Moscow
// LAST-MODIFIED:20231222T233358Z
// TZURL:https://www.tzurl.org/zoneinfo-outlook/Europe/Moscow
// X-LIC-LOCATION:Europe/Moscow
// BEGIN:STANDARD
// TZNAME:MSK
// TZOFFSETFROM:+0300
// TZOFFSETTO:+0300
// DTSTART:19700101T000000
// END:STANDARD\r\nEND:VTIMEZONE\r\nBEGIN:VEVENT\r\nDTSTAMP:20240611T233748Z\r\nUID:1718149042996-99594@ical.marudot.com\r\nDTSTART;TZID=Europe/Moscow:20240605T120000\r\nRRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH\r\nDTEND;TZID=Europe/Moscow:20240605T130000\r\nSUMMARY:event1\r\nDESCRIPTION:Some description\r\nEND:VEVENT\r\nEND:VCALENDAR
// `);

const directEvents = ref<AdminEvent[]>([]);

onMounted(async () => { 
  directEvents.value = await getEvents();
  directEvents.value.forEach(event => {
    const value = ical.sync.parseICS(event.icalendar_data)
    console.log(value)
  });
})

const showModal = ref(false);
const modalTop = ref(0);
const modalLeft = ref(0);

const handleClick = (event: MouseEvent) => {
  modalTop.value = event.clientY;
  modalLeft.value = event.clientX;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const calendarApp = createCalendar({
  selectedDate: '2024-06-15',
  views: [viewDay, viewWeek],
  defaultView: viewWeek.name,
  locale: 'ru-RU',
  plugins: [
    createEventRecurrencePlugin(),
    createDragAndDropPlugin(),
    createResizePlugin(30)
  ],
  events: [
    {
      id: 123,
      title: 'Bi-Weekly Event Monday and Wednesday',
      start: '2024-06-15 10:00',
      end: '2024-06-15 11:00',
      rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959'
    },
    {
      id: 456,
      title: 'Weekly Event on 4 occasions',
      start: '2024-06-12 14:00',
      end: '2024-06-12 15:00',
      rrule: 'FREQ=WEEKLY;COUNT=4'
    },
    {
      id: 121314,
      title: 'Daily event mo-fr 10 times',
      start: '2024-02-05 12:00',
      end: '2024-02-05 13:55',
      rrule: 'FREQ=DAILY;COUNT=10;BYDAY=MO,TU,WE,TH,FR',
      calendarId: 'work',
    },
    {
      id: 141617,
      title: 'Monthly event on the 7th 5 times',
      start: '2024-06-17 12:00',
      end: '2024-06-18 13:55',
      rrule: 'FREQ=MONTHLY;COUNT=5',
    },
    {
      rrule: 'FREQ=YEARLY;COUNT=5',
      title: 'Event on the 8th of February for 5 years',
      start: '2024-02-05 12:00',
      end: '2024-02-05 13:55',
      id: 181920
    }
  ],
  callbacks: {
    /**
     * Is called when:
     * 1. Selecting a date in the date picker
     * 2. Selecting a new view
     * */
    onRangeUpdate(range) {
      console.log('new calendar range start date', range.start)
      console.log('new calendar range end date', range.end)
    },
 
    /**
     * Is called when an event is updated through drag and drop
     * */
    onEventUpdate(updatedEvent) {
      console.log('onEventUpdate', updatedEvent)
    },
 
    /**
    * Is called when an event is clicked
    * */
    onEventClick(calendarEvent) {
      console.log('onEventClick', calendarEvent)
      console.log()
    },
 
    /**
    * Is called when clicking a date in the month grid
    * */
    onClickDate(date) {
      console.log('onClickDate', date) // e.g. 2024-01-01
    },
 
    /**
    * Is called when clicking somewhere in the time grid of a week or day view
    * */
    onClickDateTime(dateTime) {
      console.log('onClickDateTime', dateTime) // e.g. 2024-01-01 12:37
    },
 
    /**
    * Is called when selecting a day in the month agenda
    * */
    onClickAgendaDate(date) {
      console.log('onClickAgendaDate', date) // e.g. 2024-01-01
    },
 
    /**
    * Is called when double clicking a date in the month grid
    * */
    onDoubleClickDate(date) {
      console.log('onClickDate', date) // e.g. 2024-01-01
    },
 
    /**
    * Is called when double clicking somewhere in the time grid of a week or day view
    * */
    onDoubleClickDateTime(dateTime) {
      console.log('onDoubleClickDateTime', dateTime) // e.g. 2024-01-01 12:37
    },
 
    /**
    * Is called when clicking the "+ N events" button of a month grid-day
    * */
    onClickPlusEvents(date) {
      console.log('onClickPlusEvents', date) // e.g. 2024-01-01
    },
 
    /**
    * Is called when the selected date is updated
    * */
    onSelectedDateUpdate(date) {
      console.log('onSelectedDateUpdate', date)
    },
  },
})
</script>