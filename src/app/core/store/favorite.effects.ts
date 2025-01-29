import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addCharacterToFav,
  initFavCharacterList,
  removeCharacterFromFav,
  setFavCharacterList,
} from './favorite.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../shared/models/character.model';
import { selectCharacters } from './favorite.selectors';

@Injectable()
export class CharacterFavEffect {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(initFavCharacterList),
      switchMap(() => {
        const storedFavCharacters = localStorage.getItem('favCharacters');

        let characters: Character[] = [];

        if (storedFavCharacters) {
          try {
            characters = JSON.parse(storedFavCharacters);
          } catch (error) {
            console.error('Error parsing stored characters:', error);
          }
        }

        return of(setFavCharacterList({ characters }));
      })
    )
  );

  saveFavCharacters = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCharacterToFav, removeCharacterFromFav),
        withLatestFrom(this.store.select(selectCharacters)),
        tap(([action, characters]) => {
          const charactersString = JSON.stringify(characters);
          localStorage.setItem('favCharacters', charactersString);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ characters: Character[] }>
  ) {}
}
