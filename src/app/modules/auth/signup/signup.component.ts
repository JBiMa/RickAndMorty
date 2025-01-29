import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/servers/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: '../../../../styles/components/auth.scss',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  signupError: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      passwords: new FormGroup(
        {
          password: new FormControl(null, [Validators.required, this.strong]),
          retypePassword: new FormControl(null, [Validators.required]),
        },
        [this.passwordMatch]
      ),
    });

    this.authService.loginError$.subscribe(
      (errorMessage) => (this.signupError = errorMessage)
    );
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const email = this.signupForm.get('email').value;
      const password = this.signupForm.get('passwords.password').value;
      this.authService.signUp(email, password);
    }
  }

  get emailControl(): AbstractControl {
    return this.signupForm.get('email');
  }

  get passwordControl(): AbstractControl {
    return this.signupForm.get('passwords.password');
  }

  get retypePasswordControl(): AbstractControl {
    return this.signupForm.get('passwords.retypePassword');
  }

  get passwordsControl(): AbstractControl {
    return this.signupForm.get('passwords');
  }

  // may i should move it into validators file
  passwordMatch(c: FormControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('retypePassword').value) {
      return { invalid: true };
    }
  }

  strong(control: FormControl): { [k: string]: boolean } {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUpper && hasLower;

    if (!valid) {
      return { strong: true };
    }

    return null;
  }
}
