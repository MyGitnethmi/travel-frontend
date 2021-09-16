import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";

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

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
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
    this.progress = true;
    this.auth.signUpWithGoogle().then(httpResponse => {
      httpResponse.subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => this.error = error
      )
    }).finally(() => this.progress = false);
  }

  login(): void {
    this.error = '';
    if (this.loginForm.valid) {
      this.progress = true;
      this.auth.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          this.error = error
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
