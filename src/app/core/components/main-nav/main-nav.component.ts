import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { UserService } from '../../servers/user.service';
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../servers/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
})
export class MainNavComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;
  currentUser$: Observable<User>;
  userEmail: string = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser$;
    this.currentUser$.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
      } else {
        this.userEmail = '';
      }
    });
  }

  onLogout(): void {
    this.userEmail = '';
    this.authService.logout();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 830px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  closeDrawer(): void {
    this.drawer.close();
  }
}
