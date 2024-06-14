import axios from 'axios';
import { Place } from '@/types/client/place.interface';
import { places } from '@/store/places.store';
import { Event as IEvent } from '@/types/client/event.interface';

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

const formatDateToISO = (date: Date) => {
  const pad = (num: number) => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // getMonth() returns 0-based month
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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

    return response.data;
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

export default getPlaces;
