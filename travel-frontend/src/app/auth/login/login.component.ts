import { Component, OnInit } from '@angular/core';
import {SocialAuthService, GoogleLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService
  ) { }

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

}
