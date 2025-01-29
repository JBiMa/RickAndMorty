import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import {
  WatchList,
  WatchListElement,
} from '../../shared/models/watchList.model';
import { Episode } from '../../shared/models/episode.model';
import { WatchListService } from '../../core/servers/watchList.service';

@Component({
  selector: 'app-my-watch-list',
  templateUrl: './my-watch-list.component.html',
  styleUrls: ['./my-watch-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyWatchListComponent {
  watchLists$ = this.watchListService.watchLists$;
  selectedWatchList: WatchList;
  newWatchListName: string = '';

  constructor(
    private watchListService: WatchListService,
    private cdRef: ChangeDetectorRef
  ) {}

  createWatchList(): void {
    if (this.newWatchListName.trim()) {
      const newWatchList: WatchList = {
        id: this.generateUniqueId(),
        name: this.newWatchListName,
        episodesList: [],
        completed: false,
      };
      this.watchListService.createWatchList(newWatchList);
      this.newWatchListName = '';
    }
  }

  addToWatchList(episode: Episode): void {
    if (this.selectedWatchList) {
      const watchListElement = {
        episode: episode,
        watched: false,
      };
      this.watchListService.addEpisodeToWatchList(
        watchListElement,
        this.selectedWatchList
      );
    }
  }

  removeEpisode(
    watchListEpisode: WatchListElement,
    watchList: WatchList
  ): void {
    this.watchListService.removeEpisodeFromWatchList(
      watchListEpisode,
      watchList
    );
  }

  removeWatchList(watchList: WatchList): void {
    this.watchListService.removeWatchList(watchList);
  }

  toggleWatchedEpisode(
    watchListEpisode: WatchListElement,
    watchList: WatchList
  ): void {
    this.watchListService.changeWatchedStatus(watchListEpisode, watchList);
    this.cdRef.markForCheck();
  }

  private generateUniqueId(): number {
    return uuidv4();
  }
}
