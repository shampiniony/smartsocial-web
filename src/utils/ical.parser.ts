import { IEventTime } from "@/interfaces/ical.interface";

const parseNextWord = (data: string, word: string) => {
  const index = data.indexOf(word);
  if (index === -1) {
    return null;
  }

  const endIndex = data.indexOf('\n', index);
  const response = data.slice(index + word.length, endIndex).trim();

  return response;
};

const formatDateTime = (dateTime: string) => {
  const year = dateTime.slice(0, 4);
  const month = dateTime.slice(4, 6);
  const day = dateTime.slice(6, 8);
  const hour = dateTime.slice(9, 11);
  const minute = dateTime.slice(11, 13);

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

export const formatDateTimeForICal = (dateTime: string) => {
  const date = new Date(dateTime);
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

export const getICalData = (event_id: number, title: string, icalData: string): IEventTime[] => {
  const events = [];
  const eventRegex = /BEGIN:VEVENT[\s\S]*?END:VEVENT/g;

  let match;
  let index = 0;
  while ((match = eventRegex.exec(icalData)) !== null) {
    const eventData = match[0];

    const start_time = formatDateTime(parseNextWord(eventData, 'DTSTART:')!);
    const end_time = formatDateTime(parseNextWord(eventData, 'DTEND:')!);
    const rrule = parseNextWord(eventData, 'RRULE:');
    const id = generateRandomId();

    events.push({
      event_id: event_id,
      title: title,
      index: index,
      id: id,
      start: start_time,
      end: end_time,
      rrule: rrule
    });

    index++;
  }

  return events;
}
