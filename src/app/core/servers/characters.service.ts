import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { apiData } from '../../shared/apiData';
import { CharacterApiResponse } from '../../shared/models/characterApiResponse';

@Injectable()
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(
    page: number,
    filters?: { status?: string; species?: string; gender?: string }
  ): Observable<CharacterApiResponse> {
    const apiUrl = `${apiData.url}character`;
    let params = new HttpParams().set('page', page.toString());

    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<CharacterApiResponse>(apiUrl, { params: params }).pipe(
      catchError(() => {
        return throwError(() => 'Error while getting characters: ');
      })
    );
  }
}
