export interface AdminEvent {
  id: number;
  place_id: number;
  name: string;
  description: string;
  duration_minutes: number;
  icalendar_data: string;
  min_capacity: number;
  max_capacity: number;
  tickets: number[];
}
