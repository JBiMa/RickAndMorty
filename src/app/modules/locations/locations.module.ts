import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/modules/shared.module';
import { LocationsComponent } from './locations.component';
import { LocationService } from '../../core/servers/locations.service';

@NgModule({
  declarations: [LocationsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: LocationsComponent }]),
  ],
  providers: [LocationService],
})
export class LocationsModule {}
