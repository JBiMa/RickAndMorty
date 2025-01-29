import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { MyWatchListComponent } from './my-watch-list.component';
import { watchOrderPipe } from '../../shared/pipes/watchedEpisodesSort';

@NgModule({
  declarations: [MyWatchListComponent, watchOrderPipe],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: MyWatchListComponent }]),
  ],
  providers: [],
})
export class WatchListModule {}
