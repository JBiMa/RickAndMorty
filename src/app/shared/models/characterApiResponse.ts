import { Info } from './info.model';
import { Character } from './character.model';

export interface CharacterApiResponse {
  info: Info;
  results: Character[];
}
