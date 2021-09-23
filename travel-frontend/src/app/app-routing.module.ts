import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {ResetPasswordRequestComponent} from "./auth/reset-password-request/reset-password-request.component";
import {LinkGoogleComponent} from "./auth/link-google/link-google.component";
import {HomeComponent} from "./home/home.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {UserComponent} from "./home/user/user.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'user',
        component: UserComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'reset-password-request',
        component: ResetPasswordRequestComponent
      },
      {
        path: 'link-google',
        component: LinkGoogleComponent
      },
      {
        path: 'link-google/:email',
        component: LinkGoogleComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
