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
import ical from 'node-ical'

const directEvents = ical.sync.parseICS(`
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ical.marudot.com//iCal Event Maker
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Europe/Moscow
LAST-MODIFIED:20231222T233358Z
TZURL:https://www.tzurl.org/zoneinfo-outlook/Europe/Moscow
X-LIC-LOCATION:Europe/Moscow
BEGIN:STANDARD
TZNAME:MSK
TZOFFSETFROM:+0300
TZOFFSETTO:+0300
DTSTART:19700101T000000
END:STANDARD\r\nEND:VTIMEZONE\r\nBEGIN:VEVENT\r\nDTSTAMP:20240611T233748Z\r\nUID:1718149042996-99594@ical.marudot.com\r\nDTSTART;TZID=Europe/Moscow:20240605T120000\r\nRRULE:FREQ=WEEKLY;BYDAY=SU,MO,TU,WE,TH\r\nDTEND;TZID=Europe/Moscow:20240605T130000\r\nSUMMARY:event1\r\nDESCRIPTION:Some description\r\nEND:VEVENT\r\nEND:VCALENDAR
`);
// log the ids of these events
console.log(Object.keys(directEvents));

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