import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCharacters } from '../../core/store/favorite.selectors';
import { Character } from '../../shared/models/character.model';
import { selectCharacterById } from '../../core/store/favorite.selectors'; // Import selector for fetching detailed character information
import { removeCharacterFromFav } from '../../core/store/favorite.actions';

@Component({
  selector: 'app-favCharactersList-output',
  templateUrl: './favCharactersList.html',
  styleUrls: ['./favCharactersList.scss'],
})
export class favCharactersListComponent {
  favCharacters$: Observable<Character[]>;

  constructor(private store: Store<{ counter: number }>) {
    this.favCharacters$ = store.select(selectCharacters);
  }

  getCharacterDetails(characterId: number): Observable<Character> {
    return this.store.select(selectCharacterById(characterId));
  }

  removeCharacterFromFav(character: Character) {
    const favCharacter: Character = {
      ...character,
      isFav: false,
    };
    this.store.dispatch(removeCharacterFromFav({ character: favCharacter }));
  }
}
