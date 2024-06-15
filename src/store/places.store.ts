import { reactive } from 'vue';
import { Place } from '@/types/client/place.interface';

interface Places {
  selected: null | number;
  all: Place[];
}

export const places = reactive<Places>({
  selected: null,
  all: [],
});
