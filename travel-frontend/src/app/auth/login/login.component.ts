import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordVisible: boolean = false;

  error: string = '';
  progress: boolean = false;

  googleError: boolean = false;
  googleProgress: boolean = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  loginWithGoogle(): void {
    this.error = '';
    this.googleProgress = true;
    this.googleError = false;
    this.auth.getGoogleUser().then(user => {
      this.auth.googleSignIn(user).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          if (error.status === 409) {
            this.router.navigate(['../link-google', {email: error?.message, token: user.idToken}], {relativeTo: this.route});
          } else {
            this.googleError = true;
          }
        }
      ).add(() => this.googleProgress = false);
    }).catch(() => {
      this.googleError = true;
      this.googleProgress = false;
    });
  }

  login(): void {
    this.error = '';
    this.googleError = false;
    if (this.loginForm.valid) {
      this.progress = true;
      this.auth.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error.message;
        }
      ).add(() => this.progress = false);
    }
  }

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

}
