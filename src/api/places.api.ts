import axios from 'axios';
import { Place } from '@/types/client/place.interface';
import { places } from '@/store/places.store';

const apiUrl = import.meta.env.VITE_API_URL;

const getPlaces = async (date: Date) => {
  try {
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
    console.log(places.all)
  } catch (error) {
    console.error('Error fetching places:', error);
  }
};

export default getPlaces;
