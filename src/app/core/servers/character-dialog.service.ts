import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CharacterDialogComponent } from '../../modules/character-dialog/character-dialog.component';
import { Character } from '../../shared/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(character: Character): void {
    const dialogRef = this.dialog.open(CharacterDialogComponent, {
      data: character,
    });
  }
}
