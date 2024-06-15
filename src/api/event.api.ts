import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

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

export const createEvent = async (event: AdminEvent) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/events`, event);
    console.log('Event created successfully:', response.data);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

export async function getEvents(): Promise<AdminEvent[]> {
  try {
    const response = await axios.get<AdminEvent[]>(`${apiUrl}/api/v1/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export const updateICalOnServer = async (event_id: number, updatedIcal: string) => {
  try {
    console.log("ICAL:" + updatedIcal)

    const response = await axios.patch(`${apiUrl}/api/v1/events/${event_id}/`, {
      icalendar_data: updatedIcal
      // name: "wow"
    });
    console.log('ICal data updated successfully:', response.data);
  } catch (error) {
    console.error('Failed to update iCal data:', error);
  }
};

export const postEvent = async(event: AdminEvent) => {
  
}