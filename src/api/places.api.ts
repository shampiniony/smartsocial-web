import axios from 'axios';
import { Place } from '@/types/client/place.interface';
import { places } from '@/store/places.store';
import { Event as IEvent } from '@/types/client/event.interface';
import { formatDateToISO, pad } from '@/utils';

const apiUrl = import.meta.env.VITE_API_URL;

const getPlaces = async (date: Date) => {
  try {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const response = await axios.get(`${apiUrl}/api/v1/places/`);

    const placesData: Place[] = response.data.map((place: Place) => ({
      ...place,
      images:
        place.images.length > 0
          ? place.images
          : [
              {
                src: 'https://optim.tildacdn.com/tild3732-3266-4565-b661-646437333266/-/format/webp/opi-pas-08.jpg',
              },
            ],
    }));

    places.all = placesData;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

export const getEvents = async (id: number, date: Date) => {
  try {
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    const response = await axios.get<IEvent[]>(
      `${apiUrl}/api/v1/places/${id}/events/available/?start_datetime=${formatDateToISO(
        startDate
      )}&end_datetime=${formatDateToISO(endDate)}`
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
