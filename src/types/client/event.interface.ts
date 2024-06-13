export interface Event {
  id: number;
  place_id: number;
  name: string;
  description: string;
  available_places: number;
  capacity: number;
  start_datetime: Date;
  end_datetime: Date;
}
