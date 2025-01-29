import { Episode } from './episode.model';
import { Info } from './info.model';

export interface EpisodeApiResponse {
  info: Info;
  results: Episode[];
}
