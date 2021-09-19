import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthService} from "../../_services/auth.service";
import {environment} from "../../../environments/environment.prod";
import {UtilityService} from "../../_services/utility.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  passwordVisible: boolean = false;
  agreementError: boolean = false;

  error: string = '';
  progress: boolean = false;

  googleError: string = '';
  googleProgress: boolean = false;

  constructor(
    private auth: AuthService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(environment.passwordValidator)]],
      phone: ['', [Validators.required, Validators.pattern(environment.phoneValidator)]],
      agreement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  signup(): void {
    this.error = '';
    this.googleError = '';
    if (this.signupForm.valid) {
      this.progress = true;
      this.auth.signUp(this.signupForm.value).subscribe(
        () => {
          this.router.navigate(['/'])
        },
        error => {
          if (error?.message.name === 'ValidationError') {
            this.username?.setErrors({emailExists: true});
            UtilityService.scrollToFirstInvalidControl(this.elementRef);
          } else {
            this.error = error.message;
          }
        }
      ).add(() => this.progress = false);
    } else if (this.agreement?.invalid) {
      this.agreementError = true;
      this.agreementError = true;
    }
  }

  loginWithGoogle(): void {
    this.error = '';
    this.googleError = '';
    this.googleProgress = true;
    this.auth.getGoogleUser().then(user => {
      this.auth.googleSignIn(user).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          if (error.status === 409) {
            this.googleError = 'Account already exists. Please login';
          } else {
            this.googleError = 'An unknown error occurred..!';
          }
        }
      ).add(() => this.googleProgress = false);
    }).finally(() => this.googleProgress = false);
  }

  signOut(): void {
    this.auth.logOut();
  }

  checkPasswordLength(): boolean | null {
    return this.password && this.password.value.length >= 8;
  }

  checkCapitalLetters(): boolean | null {
    return this.password && this.password.value.match(/[A-Z]+/);
  }

  checkDigits(): boolean | null {
    return this.password && this.password.value.match(/[1-9]+/);
  }

  get username(): AbstractControl | null {
    return this.signupForm.get('username');
  }

  get firstName(): AbstractControl | null {
    return this.signupForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.signupForm.get('lastName');
  }

  get password(): AbstractControl | null {
    return this.signupForm.get('password');
  }

  get phone(): AbstractControl | null {
    return this.signupForm.get('phone');
  }

  get agreement(): AbstractControl | null {
    return this.signupForm.get('agreement');
  }

}
