import { Image } from '@/types/client/image.interface';

export interface Place {
  id: number;
  name: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lon: number;
  };
  images: Image[];
}
