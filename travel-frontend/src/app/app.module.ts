import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthComponent} from './auth/auth.component';
import {LoginComponent} from './auth/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./_material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignupComponent} from './auth/signup/signup.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./_interceptors/token.interceptor";
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import {UserComponent} from "./home/user/user.component";
import {ResetPasswordRequestComponent} from "./auth/reset-password-request/reset-password-request.component";
import {PasswordValidateComponent} from "./auth/password-validate/password-validate.component";
import {LinkGoogleComponent} from "./auth/link-google/link-google.component";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    HomeComponent,
    UserComponent,
    ResetPasswordRequestComponent,
    PasswordValidateComponent,
    LinkGoogleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '818196113392-27ol5e64s10djn0ce9bhrg3r8i977coh'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
