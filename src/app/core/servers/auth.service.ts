import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  loginError$: Subject<string> = new Subject<string>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService
  ) {
    this.initAuthStateListener();
  }

  private initAuthStateListener(): void {
    this.user$ = this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  signUp(email: string, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        if (error.code === 'auth/invalid-email') {
          this.loginError$.next('Invalid email format.');
        } else if (error.code === 'auth/weak-password') {
          this.loginError$.next(
            'Weak password. Please use a stronger password.'
          );
        } else {
          this.loginError$.next('An error occurred while signing up.');
        }
      });
  }

  login(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.userService.updateUser(userCredential.user);
        this.router.navigate(['/characters']);
      })
      .catch((error) => {
        console.error('Error logging in:', error.message);
        this.loginError$.next('Invalid email or password.');
      });
  }

  logout(): void {
    this.afAuth
      .signOut()
      .then(() => {
        this.userService.updateUser(null);
        this.router.navigate(['/home']);
        console.log('logout');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }

  get isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }
}
