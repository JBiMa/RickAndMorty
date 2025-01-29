import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuardService,
  canActivateWatchList,
} from './core/servers/authGuard.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { favCharactersListComponent } from './modules/favCharacters/favCharactersList.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./modules/characters/characters.module').then(
        (m) => m.CharactersModule
      ),
  },
  { path: 'characters-list', component: favCharactersListComponent },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./modules/episodes/episodes.module').then(
        (m) => m.EpisodesModule
      ),
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./modules/locations/locations.module').then(
        (m) => m.LocationsModule
      ),
  },
  {
    path: 'my-watch-list',
    loadChildren: () =>
      import('./modules/my-watch-list/my-watch-list.module').then(
        (m) => m.WatchListModule
      ),
    canActivate: [canActivateWatchList],
  },

  {
    path: 'not-found',
    loadChildren: () =>
      import('./modules/error-page/error-page.module').then(
        (m) => m.ErrorPageModule
      ),
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
