import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { EpisodeService } from '../../core/servers/episodes.service';
import { EpisodesComponent } from './episodes.component';

@NgModule({
  declarations: [EpisodesComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: EpisodesComponent }]),
  ],
  providers: [EpisodeService],
})
export class EpisodesModule {}
