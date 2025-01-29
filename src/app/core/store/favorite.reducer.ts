import { createReducer, on } from '@ngrx/store';
import {
  addCharacterToFav,
  removeCharacterFromFav,
  setFavCharacterList,
} from './favorite.actions';
import { Character } from '../../shared/models/character.model';

export interface AppState {
  favCharacters: Character[];
}

const initialState: AppState = {
  favCharacters: [],
};

export const favCharactersReducer = createReducer(
  initialState,
  on(addCharacterToFav, (state, { character }) => ({
    ...state,
    favCharacters: [...state.favCharacters, character],
  })),
  on(removeCharacterFromFav, (state, { character }) => ({
    ...state,
    favCharacters: state.favCharacters.filter((p) => character.id != p.id),
  })),
  on(setFavCharacterList, (state, action) => ({
    ...state,
    favCharacters: action.characters,
  }))
);
