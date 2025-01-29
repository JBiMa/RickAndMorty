import { Action, createAction, props } from '@ngrx/store';
import { Character } from '../../shared/models/character.model';

export const initFavCharacterList = createAction(
  '[FavCharacters] InitFavCharacterList'
);

export const setFavCharacterList = createAction(
  '[FavCharacters] SetFavCharacterList',
  props<{ characters: Character[] }>()
);

export const addCharacterToFav = createAction(
  '[FavCharacters] Add',
  props<{ character: Character }>()
);
export const removeCharacterFromFav = createAction(
  '[FavCharacters] Remove',
  props<{ character: Character }>()
);
