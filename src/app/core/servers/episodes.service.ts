import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiData } from '../../shared/apiData';
import { EpisodeApiResponse } from '../../shared/models/episodeApiResponse';
import { Episode } from '../../shared/models/episode.model';

@Injectable()
export class EpisodeService {
  constructor(private http: HttpClient) {}

  getEpisodes(
    page: number,
    filters?: { name?: string; episode?: string }
  ): Observable<EpisodeApiResponse> {
    const apiUrl = `${apiData.url}episode`;
    let params = new HttpParams().set('page', page.toString());

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<EpisodeApiResponse>(apiUrl, { params: params });
  }

  getSingleEpisode(episodeUrl: string): Observable<Episode> {
    return this.http.get<Episode>(episodeUrl);
  }
}
