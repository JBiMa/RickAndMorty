import { Component, OnInit } from '@angular/core';
import { Episode } from '../../shared/models/episode.model';
import { EpisodeService } from '../../core/servers/episodes.service';
import { getValidFilters, itemsPerPage } from '../../shared/core/constants';
import {
  Observable,
  Subscription,
  catchError,
  delay,
  map,
  tap,
  throwError,
} from 'rxjs';
import { WatchList } from '../../shared/models/watchList.model';
import { WatchListService } from '../../core/servers/watchList.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EpisodeFilters } from '../../shared/models/filters.model';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../core/servers/user.service';
@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: [
    './episodes.component.scss',
    '../../../styles/components/paginator.scss',
  ],
})
export class EpisodesComponent implements OnInit {
  currentUser$: Observable<User>;
  userEmail: string = '';
  isLoading: boolean;
  watchLists$: Observable<WatchList[]> = this.watchListService.watchLists$;
  episodes$: Observable<Episode[]>;
  itemsPerPageValue: number = itemsPerPage;
  actualPage: number = 1;
  totalEpisodes: number = 0;
  filters: EpisodeFilters = {
    name: '',
    episode: '',
  };

  constructor(
    private episodesService: EpisodeService,
    private watchListService: WatchListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
    this.activatedRoute.queryParams.subscribe((params) => {
      const validFilters = getValidFilters<EpisodeFilters>(
        params,
        this.filters
      );
      this.filters = { ...this.filters, ...validFilters };
      this.loadEpisodes();
    });
  }

  loadEpisodes(): void {
    this.isLoading = true;
    this.episodes$ = this.episodesService
      .getEpisodes(this.actualPage, this.filters)
      .pipe(
        tap((data) => {
          this.totalEpisodes = data.info.count;
          this.isLoading = false;
        }),
        map((data) => data.results),
        catchError((error) => {
          this.isLoading = false;
          return throwError(() => error);
        })
      );
  }

  updateUrl(): void {
    const queryParams = { ...this.filters, page: this.actualPage };
    this.router.navigate([], { queryParams });
  }

  onPageChange(event: any): void {
    this.actualPage = event.pageIndex + 1;
    this.updateUrl();
  }

  addToWatchList(episode: Episode, selectedWatchList: WatchList) {
    const watchListElement = {
      episode: episode,
      watched: false,
    };
    this.watchListService.addEpisodeToWatchList(
      watchListElement,
      selectedWatchList
    );
  }
}
