import { Episode } from './episode.model';
import { LocationRM } from './location.model';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationRM;
  location: LocationRM;
  image: string;
  episode: Episode;
  url: string;
  created: string;
  isFav: boolean;
}
