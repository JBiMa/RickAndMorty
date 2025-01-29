import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CharactersService } from '../../core/servers/characters.service';
import { CharacterDialogService } from '../../core/servers/character-dialog.service';
import { CharactersComponent } from './characters.component';
import { CharacterDialogComponent } from '../character-dialog/character-dialog.component';
import { CharacterStatusDirective } from '../../shared/directives/shared-directive';
import { SharedModule } from '../../shared/modules/shared.module';
import { EpisodeService } from '../../core/servers/episodes.service';

@NgModule({
  declarations: [
    CharactersComponent,
    CharacterDialogComponent,
    CharacterStatusDirective,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CharactersComponent }]),
  ],
  providers: [CharactersService, CharacterDialogService, EpisodeService],
})
export class CharactersModule {}
