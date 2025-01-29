import { Character } from './character.model';

export interface LocationRM {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character;
  url: Location;
  created: string;
}
