export interface IEventTime {
  id: number;
  event_id: number;
  title: string;
  rrule: string | null; 
  start: string;
  end: string;
}