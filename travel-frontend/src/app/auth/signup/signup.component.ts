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

  constructor(
    private auth: AuthService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private utility: UtilityService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['vshwjayasanka@gmail.com', [Validators.required, Validators.email]],
      firstName: ['Vishwa', [Validators.required]],
      lastName: ['Jayasanka', [Validators.required]],
      password: ['Vishwa1235#', [Validators.required, Validators.pattern(environment.passwordValidator)]],
      phone: ['719251862', [Validators.required, Validators.pattern(environment.phoneValidator)]],
      agreement: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
  }

  signup(): void {
    this.error = '';
    if (this.signupForm.valid) {
      this.progress = true;
      this.auth.signUp(this.signupForm.value).subscribe(
        () => {
          this.router.navigate(['/'])
        },
        error => {
          if (error?.name === 'ValidationError') {
            this.username?.setErrors({emailExists: true});
            this.utility.scrollToFirstInvalidControl(this.elementRef);
          } else {
            this.error = error;
          }
        }
      ).add(() => this.progress = false);
    } else if (this.agreement?.invalid) {
      this.agreementError = true;
    }
  }

  loginWithGoogle(): void {
    this.error = '';
    this.auth.signUpWithGoogle().then(httpResponse => {
      httpResponse.subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => this.error = error
      )
    });
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
