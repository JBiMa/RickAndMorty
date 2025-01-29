import { Episode } from './episode.model';

interface WatchListElement {
  episode: Episode;
  watched: boolean;
}

interface WatchList {
  id: number;
  name: string;
  episodesList: WatchListElement[];
  completed: boolean;
}

export { WatchList, WatchListElement };
