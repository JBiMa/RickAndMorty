import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './favorite.reducer';
import { Character } from '../../shared/models/character.model';

export const selectAppState = createFeatureSelector<AppState>('favorite');

export const selectCharacters = createSelector(
  selectAppState,
  (state) => state.favCharacters
);

export const selectCharacterById = (characterId: number) =>
  createSelector(selectCharacters, (characters: Character[]) =>
    characters.find((character) => character.id === characterId)
  );

export const selectIsCharacterFavById = (characterId: number) =>
  createSelector(
    selectCharacterById(characterId),
    (character: Character | undefined) => !!character?.isFav
  );
