import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/servers/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../../../../styles/components/auth.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError$: Observable<string>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    this.loginError$ = this.authService.loginError$;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.authService.login(email, password);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  get emailControl(): AbstractControl {
    return this.loginForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.loginForm.get('password');
  }
}
