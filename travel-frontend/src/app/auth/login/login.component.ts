import { Component, OnInit } from '@angular/core';
import {SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private socialAuthService: SocialAuthService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {

    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });

  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  get username(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

}
