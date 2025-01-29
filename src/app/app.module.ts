import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainNavComponent } from './core/components/main-nav/main-nav.component';
import { HttpClientModule } from '@angular/common/http';
import { WatchListService } from './core/servers/watchList.service';
import { environment } from './shared/core/environments-auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './modules/auth/login/login.component';
import { SignupComponent } from './modules/auth/signup/signup.component';
import { AuthGuardService } from './core/servers/authGuard.service';
import { LoadingScreenComponent } from './core/components/loading-screen/loading-screen.component';
import { AuthService } from './core/servers/auth.service';
import { SharedModule } from './shared/modules/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { favCharactersReducer } from './core/store/favorite.reducer';
import { favCharactersListComponent } from './modules/favCharacters/favCharactersList.component';
import { CharacterFavEffect } from './core/store/favorite.effects';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoadingScreenComponent,
    LoginComponent,
    SignupComponent,
    favCharactersListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    SharedModule,
    StoreModule.forRoot({
      favorite: favCharactersReducer,
    }),
    EffectsModule.forRoot([CharacterFavEffect]),
  ],
  providers: [
    provideAnimationsAsync(),
    WatchListService,
    AuthService,
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
