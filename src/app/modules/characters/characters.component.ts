import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../core/servers/characters.service';
import { Character } from '../../shared/models/character.model';
import { CharacterDialogService } from '../../core/servers/character-dialog.service';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import {
  getValidFilters,
  itemsPerPage,
  suggestions,
} from '../../shared/core/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterFilters } from '../../shared/models/filters.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: [
    './characters.component.scss',
    '../../../styles/components/paginator.scss',
  ],
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;
  itemsPerPageValue = itemsPerPage;
  actualPage = 1;
  totalCharacters = 0;
  suggestions = suggestions;
  isLoading: boolean;
  filters: CharacterFilters = {
    species: '',
    status: '',
    gender: '',
  };

  constructor(
    private charactersService: CharactersService,
    private dialogService: CharacterDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const validFilters = getValidFilters<CharacterFilters>(
        params,
        this.filters
      );
      this.filters = { ...this.filters, ...validFilters };
      this.loadCharacters();
    });
  }

  loadCharacters(): void {
    this.isLoading = true;
    this.characters$ = this.charactersService
      .getCharacters(this.actualPage, this.filters)
      .pipe(
        tap((data) => {
          this.totalCharacters = data.info.count;
          this.isLoading = false;
        }),
        map((data) => {
          return data.results.map((character) => ({
            ...character,
            isFav: false,
          }));
        }),
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

  openCharacterDetails(character: Character): void {
    this.dialogService.openDialog(character);
  }
}
