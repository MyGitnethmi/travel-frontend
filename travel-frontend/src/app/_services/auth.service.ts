import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

import {CurrentUser} from "../_models/current-user";
import {environment} from "../../environments/environment.prod";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private socialAuth: SocialAuthService
  ) {
  }

  setUser(response: any): CurrentUser {
    const currentUser: CurrentUser = response.user;
    console.log(response);
    if (currentUser?.token) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return currentUser;
  }

  login(credentials: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/login`, credentials).pipe(map(response => {
      console.log(response);
      return this.setUser(response);
    }));
  }

  signUp(user: object): Observable<any> {
    return this.http.post<any>(`${environment.api}/auth/sign-up`, user).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  async signUpWithGoogle(): Promise<Observable<any>> {
    const user: SocialUser = await this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
    return this.http.post<any>(`${environment.api}/auth/google-sign-in`, user).pipe(map(response => {
      return this.setUser(response);
    }));
  }

  logOut(): void {
    this.socialAuth.signOut().then(() => {
        console.log('signed out..!')
      }
    )
  }

}
