import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page.component';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
      SharedModule,
      RouterModule.forChild([{ path: '', component: ErrorPageComponent }]),
  ],
  providers: [],
})
export class ErrorPageModule {}
