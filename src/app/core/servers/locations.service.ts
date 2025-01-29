import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiData } from '../../shared/apiData';
import { LocationApiResponse } from '../../shared/models/locationApiResponse';

@Injectable()
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations(
    page: number,
    filters?: { name?: string; type?: string; dimension?: string }
  ): Observable<LocationApiResponse> {
    const apiUrl = `${apiData.url}location`;
    let params = new HttpParams().set('page', page.toString());
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<LocationApiResponse>(apiUrl, { params: params });
  }
}
