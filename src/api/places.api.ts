import axios from 'axios';
import { Place } from '@/types/client/place.interface';
import { places } from '@/store/places.store';
import { Event as IEvent } from '@/types/client/event.interface';

import { apiUrl } from '@/router/router';

const getPlaces = async (date: Date) => {
  try {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const response = await axios.get(`${apiUrl}/api/v1/places/`);

    places.all = response.data;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

export const getEvents = async (id: number, date: Date) => {
  try {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const response = await axios.get<IEvent[]>(
      `${apiUrl}/api/v1/places/${id}/events/available/?start_datetime=${startDate.toISOString()}&end_datetime=${endDate.toISOString()}`
    );

    const timeResponse = response.data.map((data) => ({
      ...data,
      start_datetime: new Date(data.start_datetime),
      end_datetime: new Date(data.end_datetime),
    }));

    return timeResponse;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

export default getPlaces;
