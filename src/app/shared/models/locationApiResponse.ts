import { LocationRM } from './location.model';
import { Info } from './info.model';

export interface LocationApiResponse {
  info: Info;
  results: LocationRM[];
}
