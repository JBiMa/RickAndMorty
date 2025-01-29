import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );

  public currentUser$: Observable<User> =
    this.currentUserSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUserSubject.next(user);
    });
  }

  updateUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  logoutUser(): void {
    this.currentUserSubject = null;
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
}
