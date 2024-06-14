import { IImage } from "@/interfaces/image.interface";
import { ILocation } from "@/interfaces/location.interface";

export interface IPlace {
	id: number;
	name: string;
	description: string;
	address: string;
	location: ILocation;
	images: IImage[];
}
