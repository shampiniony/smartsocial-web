<template>
  <div class='pt-20'>
    <ScheduleXCalendar :calendar-app="calendarApp" />
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
import '@schedule-x/theme-default/dist/index.css'

const calendarApp = createCalendar({
  selectedDate: '2024-06-15',
  views: [viewDay, viewWeek],
  defaultView: viewWeek.name,
  plugins: [
    createEventRecurrencePlugin()
  ],
  events: [
    {
      id: 123,
      title: 'Bi-Weekly Event Monday and Wednesday',
      start: '2024-02-05 14:00',
      end: '2024-02-05 15:00',
      rrule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20240229T235959'
    },
    {
      id: 456,
      title: 'Weekly Event on 4 occasions',
      start: '2024-02-03',
      end: '2024-02-03',
      rrule: 'FREQ=WEEKLY;COUNT=4'
    },
    {
      id: 789,
      title: 'Daily event 5 times',
      start: '2024-02-05 12:00',
      end: '2024-02-05 13:55',
      rrule: 'FREQ=DAILY;COUNT=5',
      calendarId: 'personal',
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
      start: '2024-02-07 16:00',
      end: '2024-02-07 17:55',
      rrule: 'FREQ=MONTHLY;COUNT=5',
    },
    {
      rrule: 'FREQ=YEARLY;COUNT=5',
      title: 'Event on the 8th of February for 5 years',
      start: '2024-02-08 16:00',
      end: '2024-02-08 17:55',
      id: 181920
    }
  ]
})
</script>