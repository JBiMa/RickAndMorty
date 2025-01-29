import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EpisodeService } from '../../core/servers/episodes.service';
import { Observable } from 'rxjs';
import { Character } from '../../shared/models/character.model';
import { Store, select } from '@ngrx/store';
import { addCharacterToFav } from '../../core/store/favorite.actions';
import { selectIsCharacterFavById } from '../../core/store/favorite.selectors';

@Component({
  selector: 'app-character-dialog',
  templateUrl: './character-dialog.component.html',
  styleUrls: ['./character-dialog.component.scss'],
  host: {
    class: 'dialog-popup',
    '(click)': 'closeDialog()',
  },
})
export class CharacterDialogComponent implements OnInit {
  firstEpisodeName: string = '';
  lastEpisodeName: string = '';
  isFav$: Observable<Boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public character: Character,
    public dialogRef: MatDialogRef<CharacterDialogComponent>,
    private episodeService: EpisodeService,
    private store: Store<{ favCharacters: Character }>
  ) {}

  ngOnInit(): void {
    this.getEpisodeName(this.character.episode);
    this.isFav$ = this.store.pipe(
      select(selectIsCharacterFavById(this.character.id))
    );
  }

  getEpisodeName(episodeUrls): void {
    this.episodeService.getSingleEpisode(episodeUrls[0]).subscribe((data) => {
      this.firstEpisodeName = data.name;
    });
    this.episodeService
      .getSingleEpisode(episodeUrls[episodeUrls.length - 1])
      .subscribe((data) => {
        this.lastEpisodeName = data.name;
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addCharacterToFav(character: Character) {
    const favCharacter: Character = {
      ...character,
      isFav: true,
    };
    this.store.dispatch(addCharacterToFav({ character: favCharacter }));
  }
}
