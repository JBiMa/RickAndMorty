// watch-list.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  WatchList,
  WatchListElement,
} from '../../shared/models/watchList.model';

@Injectable()
export class WatchListService {
  private watchListsSubject$ = new BehaviorSubject<WatchList[]>([]);
  watchLists$ = this.watchListsSubject$.asObservable();

  constructor() {
    this.loadWatchListsFromLocalStorage();
  }

  loadWatchListFromLocalStorage(): void {
    const storedWatchLists = localStorage.getItem('watchLists');
    const watchLists = storedWatchLists ? JSON.parse(storedWatchLists) : [];
  }

  createWatchList(newWatchList: WatchList): void {
    const currentWatchLists = this.watchListsSubject$.value;
    const updatedWatchLists = [...currentWatchLists, newWatchList];
    this.updateWatchLists(updatedWatchLists);
  }

  removeWatchList(selectedWatchList): void {
    const currentWatchLists = this.watchListsSubject$.value;
    const updatedWatchLists = currentWatchLists.filter(
      (watchList) => watchList.id !== selectedWatchList.id
    );
    this.updateWatchLists(updatedWatchLists);
  }

  addEpisodeToWatchList(
    watchListElement: WatchListElement,
    selectedWatchList: WatchList
  ): void {
    const updatedWatchLists = this.watchListsSubject$.value.map((list) => {
      if (list.id === selectedWatchList.id) {
        list.episodesList.push(watchListElement);
      }

      return list;
    });
    this.updateWatchLists(updatedWatchLists);
  }

  removeEpisodeFromWatchList(
    watchListElement: WatchListElement,
    watchList: WatchList
  ): void {
    const updatedWatchLists = this.watchListsSubject$.value.map((list) => {
      if (list.id === watchList.id) {
        list.episodesList = list.episodesList.filter(
          (episode) => episode !== watchListElement
        );
      }

      return list;
    });
    this.updateWatchLists(updatedWatchLists);
  }

  changeWatchedStatus(
    watchListElement: WatchListElement,
    watchList: WatchList
  ) {
    const updatedWatchLists = this.watchListsSubject$.value.map((list) => {
      if (list.id === watchList.id) {
        watchListElement.watched = !watchListElement.watched;
      }

      return list;
    });
    this.updateWatchLists(updatedWatchLists);
  }

  private updateWatchLists(watchLists: WatchList[]): void {
    this.watchListsSubject$.next(watchLists);
    this.saveWatchListsToLocalStorage(watchLists);
  }

  private saveWatchListsToLocalStorage(watchLists: WatchList[]): void {
    localStorage.setItem('watchLists', JSON.stringify(watchLists));
  }

  private loadWatchListsFromLocalStorage(): void {
    const storedWatchLists = localStorage.getItem('watchLists');
    const watchLists = storedWatchLists ? JSON.parse(storedWatchLists) : [];
    this.watchListsSubject$.next(watchLists);
  }
}
