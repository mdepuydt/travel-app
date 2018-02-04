export interface Article {
  id?: number;
  title: string;
  content: string;
  creationDate: string;
  photoName?: string;
  photos?: Array<string>;
  location?: Geolocation;
  address?: string;
  latitude?: number,
  longitude?: number
}

export interface Geolocation {
  latitude?: number;
  longitude?: number;
}
